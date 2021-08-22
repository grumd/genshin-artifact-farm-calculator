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

const chanceOfFourSubs = 0.25;

export const calculateChance = <
  T extends Types,
  M extends MainStatsByType<T>,
  Subs extends SubStatsByMain<M>
>({
  type,
  mainStat,
  subStats = {},
}: CalculateOptions<T, M, Subs>): number => {
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
    const fourUpgrades = new Combination(allSubstatUpgrades, 4).toArray();
    const fiveUpgrades = new Combination(allSubstatUpgrades, 5).toArray();

    const initialTiers = new BaseN(
      [0, 1, 2, 3],
      neededSubStatList.length
    ).toArray();

    const addInitialTiers = (
      upgradesList: [number, number][][]
    ): [number, number][][] =>
      _.flatMap((tiers) => {
        return upgradesList.map((upgrades) => [
          ...tiers.map((tier, index): [number, number] => [index, tier]),
          ...upgrades,
        ]);
      }, initialTiers);

    const fourUpgradesWithInitial = addInitialTiers(fourUpgrades);
    const fiveUpgradesWithInitial = addInitialTiers(fiveUpgrades);

    const getFittingUpgrades = _.filter<[number, number][]>((upgrades) => {
      const subsTotals: Partial<Record<SubStats, number>> = {};
      upgrades.forEach(([statNum, tier]) => {
        if (neededSubStatList.length > statNum) {
          // only upgrades that affect the substats we need matter to us, ignore the rest
          const key = neededSubStatList[statNum];
          subsTotals[key] =
            ((subsTotals[key] as number) || 0) + upgradeTiers[key][tier];
        }
      });
      const isFitting = neededSubStatList.every(
        (sub) => subStats[sub] <= (subsTotals[sub] || 0)
      );
      // isFitting && console.log(isFitting, subsTotals, subStats, upgrades);
      return isFitting;
    });

    const fourFittingUpgrades = getFittingUpgrades(fourUpgradesWithInitial);
    const fiveFittingUpgrades = getFittingUpgrades(fiveUpgradesWithInitial);
    console.log(
      "Getting desired with 4 upgrades:",
      fourFittingUpgrades.length,
      fourUpgradesWithInitial.length,
      fourFittingUpgrades.length / fourUpgradesWithInitial.length
    );
    console.log(
      "Getting desired with 5 upgrades:",
      fiveFittingUpgrades.length,
      fiveUpgradesWithInitial.length,
      fiveFittingUpgrades.length / fiveUpgradesWithInitial.length
    );

    chance *=
      chanceOfFourSubs *
        (fiveFittingUpgrades.length / fiveUpgradesWithInitial.length) +
      ((1 - chanceOfFourSubs) * fourFittingUpgrades.length) /
        fourUpgradesWithInitial.length;
  }
  return chance;
};
