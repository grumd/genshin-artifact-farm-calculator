import { Permutation } from "js-combinatorics";
import _ from "lodash/fp";
import { subStatChances } from "../data/chances";
import { SubStatsByMain } from "../data/combinations";
import { Stats, Types } from "../data/enums";

test("fake test to check artifact distribution", () => {
  const subChances = subStatChances[Types.Plume][Stats.ATKFlat];
  type Subs = SubStatsByMain<Stats.ATKFlat>;
  const desiredSubs: Subs[] = [Stats.CD];
  console.log(subChances);
  const createArtifact = (): string[] => {
    let totalWeight = 1;
    let subsPool = _.toPairs(subChances);
    let selectedSubs = [];

    for (let i = 0; i < 4; i++) {
      const seed = Math.random();
      let passedTotal = 0;
      for (let j = 0; j < subsPool.length; j++) {
        const weight = subsPool[j][1];
        passedTotal += weight / totalWeight; // weight of substat
        if (seed <= passedTotal) {
          // this is the sub we select
          totalWeight -= weight; // subtract weight from total
          selectedSubs.push(subsPool[j][0]);
          subsPool.splice(j, 1);
          break;
        }
      }
    }

    return selectedSubs;
  };

  let artifacts = [];
  let subCounts: Record<string, number> = {};
  for (let i = 0; i < 1000000; i++) {
    const art = createArtifact();
    artifacts.push(art);
    for (const sub in art) {
      subCounts[sub] = (subCounts[sub] || 0) + 1;
    }
  }

  const sum = _.sum(_.values(subCounts));
  subCounts = _.mapValues((val) => val / sum, subCounts);

  console.log(subCounts);

  const count =
    _.countBy(
      (artifact) => desiredSubs.every((sub) => artifact.includes(sub)),
      artifacts
    ).true || 0;
  console.log("Real world count:", count / artifacts.length);

  const substatsCombinations = new Permutation(
    _.keys(subChances),
    4
  ).toArray() as [Subs, Subs, Subs, Subs][];
  console.log(
    "Number of combinations of sub stats:",
    substatsCombinations.length
  );
  const withChance = substatsCombinations.map((comb) => {
    let weight = 1;
    let chance = 1;
    for (let i = 0; i < 4; i++) {
      const ch = subChances[comb[i]];
      chance *= ch / weight;
      weight -= ch;
    }
    return [comb, chance] as const;
  });

  let totalWeightsMatched = 0;
  let totalWeightsUnmatched = 0;
  withChance.forEach((info) => {
    if (desiredSubs.every((needSub) => info[0].includes(needSub))) {
      totalWeightsMatched += info[1];
    } else {
      totalWeightsUnmatched += info[1];
    }
  });

  const chanceSubsMatch =
    totalWeightsMatched / (totalWeightsUnmatched + totalWeightsMatched);
  console.log(
    "With combinations:",
    chanceSubsMatch,
    totalWeightsUnmatched + totalWeightsMatched
  );

  expect(true).toBeTruthy();
});
