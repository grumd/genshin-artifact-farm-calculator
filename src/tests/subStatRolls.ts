import { Combination } from "js-combinatorics";
import _ from "lodash/fp";
import { subStatChances } from "../data/chances";
import { Stats, SubStats } from "../data/enums";

const subChances = subStatChances["Goblet of Eonothem"]["Electro DMG Bonus%"];

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
      if (seed < passedTotal) {
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

const desiredSubs: SubStats[] = [Stats.CR, Stats.CD, Stats.ATK, Stats.ATKFlat];
const count =
  _.countBy(
    (artifact) => desiredSubs.every((sub) => artifact.includes(sub)),
    artifacts
  ).true || 0;
console.log("Real world count:", count / artifacts.length);

// calculate with a formula now
const chanceToNotSee = desiredSubs.map((sub) => {
  return (
    1 -
    (1 - subChances[sub]) *
      (1 - subChances[sub]) *
      (1 - subChances[sub]) *
      (1 - subChances[sub])
  );
  // return 1 - Math.pow(1 - subChances[sub], 4);
});

console.log(
  "With math:",
  chanceToNotSee.reduce((prod, num) => prod * num, 1)
);

const substatsCombinations = new Combination(
  _.keys(subChances),
  4
).toArray() as [SubStats, SubStats, SubStats, SubStats][];
console.log(substatsCombinations);
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
console.log("With combinations:", chanceSubsMatch);
