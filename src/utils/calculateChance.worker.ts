import * as Comlink from "comlink";
import { BaseN, Permutation } from "js-combinatorics";

import { mainStatChances, subStatChances, upgradeTiers } from "../data/chances";
import { allowedSubStats } from "../data/combinations";
import { SubStats, MainStats, Types } from "../data/enums";

interface CalculateOptions {
  acceptBothSets: boolean;
  type: Types;
  mainStat: MainStats;
  subStats?: Partial<Record<SubStats, number>>;
}

export interface CalculateResult {
  chance: number;
  upgradeChance?: number;
  chanceSubsMatch?: number;
}

let combinationsMemo:
  | undefined
  | { fourUpgrades: [number, number][][]; fiveUpgrades: [number, number][][] };

export const calculateChance = ({
  acceptBothSets,
  type,
  mainStat,
  subStats = {},
}: CalculateOptions): CalculateResult => {
  let chance = 1,
    upgradeChance,
    totalChanceSubsMatch;
  const chanceOfFourSubs = 0.2;

  if (!combinationsMemo) {
    // Calculate combinations once and memoize them
    const allSubstatUpgrades: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      // every tier of upgrade
      for (let j = 0; j < 4; j++) {
        // every substat
        allSubstatUpgrades.push([j, i]);
      }
    }
    combinationsMemo = {
      fourUpgrades: new BaseN(allSubstatUpgrades, 4).toArray(),
      fiveUpgrades: new BaseN(allSubstatUpgrades, 5).toArray(),
    };
  }
  const { fourUpgrades, fiveUpgrades } = combinationsMemo;

  // GETTING THE CORRECT ARTIFACT SET
  if (!acceptBothSets) {
    chance *= 0.5;
  }

  // GETTING THE CORRECT TYPE
  chance *= 0.2;

  // GETTING THE CORRECT MAIN STAT
  const byTypes = mainStatChances[type];
  chance *= byTypes[mainStat] ?? 0;

  // GETTING ALL THE SUB-STATS WE NEED
  const neededSubStatList = Object.keys(subStats) as SubStats[];
  if (neededSubStatList.length > 0) {
    // CHANCE OF GETTING THE SUB-STATS WE NEED INITIALLY
    // Getting all combinations of 4 sub-stats that are possible
    const substatsCombinations = new Permutation(
      allowedSubStats[mainStat],
      4
    ).toArray();
    console.log("Number of substat permutations:", substatsCombinations.length);
    const subChance = subStatChances[type][mainStat];
    // Combinations of sub-stats have different chances of appearing, calculate chances
    const combinationsWithChances = substatsCombinations.map((comb) => {
      let weight = 1;
      let chance = 1;
      for (let i = 0; i < 4; i++) {
        const ch = subChance?.[comb[i]] ?? 0;
        chance *= ch / weight;
        weight -= ch;
      }
      return [comb, chance] as const;
    });
    // Count how many combinations fit our criteria
    let totalWeightsMatched = 0;
    let totalWeights = 0;
    combinationsWithChances.forEach((info) => {
      if (neededSubStatList.every((needSub) => info[0].includes(needSub))) {
        totalWeightsMatched += info[1];
      }
      totalWeights += info[1];
    });
    const chanceSubsMatch = totalWeightsMatched / totalWeights;
    console.log("Getting initial substats that fit criteria", chanceSubsMatch);

    chance *= chanceSubsMatch;
    totalChanceSubsMatch = chance;

    // GETTING ENOUGH SUBSTAT UPGRADES TO MATCH THE NUMBER
    const getFittingUpgrades = (upgrades: [number, number][][]) =>
      upgrades.reduce((sumChances, upgrade) => {
        const subsTotals: Partial<Record<SubStats, number>> = {};
        upgrade.forEach(([statNum, tier]) => {
          // only upgrades that affect the substats we need matter to us, ignore the rest
          if (neededSubStatList.length > statNum) {
            const key = neededSubStatList[statNum];
            subsTotals[key] = (subsTotals[key] || 0) + upgradeTiers[key][tier];
          }
        });
        let chanceThatItFits = 1;
        for (let i = 0; i < neededSubStatList.length; i++) {
          const sub = neededSubStatList[i];
          let didThisSubStatFit = false;
          // We need to also take into account that first roll of initial sub-stats can be one of 4 tiers
          for (let tier = 0; tier < 4; tier++) {
            const initialSubStatValue = upgradeTiers[sub][tier];
            if (
              initialSubStatValue + (subsTotals[sub] || 0) >=
              subStats[sub]!
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
      }, 0);

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

    upgradeChance =
      chanceOfFourSubs * (fiveFittingUpgrades / fiveUpgrades.length) +
      ((1 - chanceOfFourSubs) * fourFittingUpgrades) / fourUpgrades.length;
    chance *= upgradeChance;
  }

  // 7% chance of getting a 2nd artifact because of https://docs.google.com/spreadsheets/d/1RcuniapqS6nOP05OCH0ui10Vo3bWu0AvFbhgcHzTybY/edit#gid=2061598189
  console.log("Chance for one artifact to be good:", chance);
  chance = 1 - (1 - chance) * (1 - 0.07 * chance);
  console.log(
    "Chance for at least one artifact to be good from one domain run:",
    chance
  );

  return {
    chance,
    upgradeChance,
    chanceSubsMatch: totalChanceSubsMatch,
  };
};

Comlink.expose(
  { calculateChance },
  process.env.VITEST ? (self as Comlink.Endpoint) : undefined
);
