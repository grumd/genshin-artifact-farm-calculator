import { BaseN, Combination } from "js-combinatorics";
import _ from "lodash/fp";

import { mainStatChances, StatMap, upgradeTiers } from "../data/chances";
import {
  allowedSubStats,
  MainStatsByType,
  SubStatsByMain,
} from "../data/combinations";
import { MainStats, SubStats, Types } from "../data/enums";

interface CalculateOptions<
  T extends Types,
  M extends MainStatsByType<T>,
  Subs extends SubStatsByMain<M>
> {
  type: T;
  mainStat: M;
  subStats?: {
    [Sub in Subs]?: number;
  };
}

const chanceOfFourSubs = 0.2;

export const calculateChance = async <
  T extends Types,
  M extends MainStatsByType<T>,
  Subs extends SubStatsByMain<M>
>({
  type,
  mainStat,
  subStats = {},
}: CalculateOptions<T, M, Subs>): Promise<number> => {
  // Base chance is 1.07 because of https://docs.google.com/spreadsheets/d/1RcuniapqS6nOP05OCH0ui10Vo3bWu0AvFbhgcHzTybY/edit#gid=2061598189
  // 1.07 is the average number of 5* artifacts from one run of a domain
  let chance = 1.07;

  // Getting the correct artifact set
  chance *= 0.5;

  // Getting the correct type
  chance *= 0.2;

  // Getting the correct main stat
  const byTypes: StatMap<Types> = mainStatChances[type]; // TS hack because TS can't index these mapped types :(
  chance *= byTypes[mainStat];

  // Getting all the sub-stats we need
  const neededSubStatList = _.keys(subStats) as Subs[];
  if (neededSubStatList.length > 0) {
    const possibleSubStats = allowedSubStats[mainStat as MainStats];
    const substatsCombinations = new Combination(possibleSubStats, 4).toArray();
    const matchesSubs = _.countBy((subs: SubStats[]) =>
      neededSubStatList.every((needSub) => subs.includes(needSub))
    );
    const matchedSubstatsCount = matchesSubs(substatsCombinations).true || 0;
    const chanceSubsMatch = matchedSubstatsCount / substatsCombinations.length;
    console.log("Getting initial substats that fit criteria", chanceSubsMatch);

    chance *= chanceSubsMatch;

    // Getting enough substats to match the number
    const allSubstatUpgrades: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      // every tier of upgrade
      for (let j = 0; j < 4; j++) {
        // every substat
        allSubstatUpgrades.push([j, i]);
      }
    }
    const fourUpgrades = new BaseN(allSubstatUpgrades, 4).toArray();
    const fiveUpgrades = new BaseN(allSubstatUpgrades, 5).toArray();

    const getFittingUpgrades = _.reduce(
      (sumChances: number, upgrades: [number, number][]): number => {
        const subsTotals: Partial<Record<SubStats, number>> = {};
        upgrades.forEach(([statNum, tier]) => {
          // only upgrades that affect the substats we need matter to us, ignore the rest
          if (neededSubStatList.length > statNum) {
            const key = neededSubStatList[statNum];
            subsTotals[key] =
              ((subsTotals[key] as number) || 0) + upgradeTiers[key][tier];
          }
        });
        let chanceThatItFits = 1;
        for (let i = 0; i < neededSubStatList.length; i++) {
          const sub = neededSubStatList[i];
          let didThisSubStatFit = false;
          for (let tier = 0; tier < 4; tier++) {
            const initialSubStatValue = upgradeTiers[sub][tier];
            if (
              initialSubStatValue + (subsTotals[sub as SubStats] || 0) >=
              subStats[sub]
            ) {
              // With this initial value substat fits the criteria
              didThisSubStatFit = true;
              chanceThatItFits *= 1 - 0.25 * tier;
              break;
            }
          }
          if (!didThisSubStatFit) {
            chanceThatItFits = 0;
            break;
          }
        }

        return sumChances + chanceThatItFits;
      },
      0
    );

    const fourFittingUpgrades = getFittingUpgrades(fourUpgrades);
    const fiveFittingUpgrades = getFittingUpgrades(fiveUpgrades);

    console.log(
      "Getting desired with 4 upgrades:",
      fourFittingUpgrades,
      fourUpgrades.length,
      fourFittingUpgrades / fourUpgrades.length
    );
    console.log(
      "Getting desired with 5 upgrades:",
      fiveFittingUpgrades,
      fiveUpgrades.length,
      fiveFittingUpgrades / fiveUpgrades.length
    );

    chance *=
      chanceOfFourSubs * (fiveFittingUpgrades / fiveUpgrades.length) +
      ((1 - chanceOfFourSubs) * fourFittingUpgrades) / fourUpgrades.length;
  }

  console.log("Final chance:", chance);

  return chance;
};

export default function Worker() {
  return { calculateChance };
}
