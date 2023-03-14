import { Types, Stats } from "../data/enums";
import * as Comlink from "comlink";

const getWorker = () => {
  return Comlink.wrap<typeof import("../utils/calculateChance.worker")>(
    new Worker(new URL("../utils/calculateChance.worker.ts", import.meta.url), {
      type: "module",
    })
  );
};

test("calculates chance without substats", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: true,
      type: Types.Flower,
      mainStat: Stats.HPFlat,
      subStats: {},
    });

  expect(chance).toBeGreaterThan(0);
  expect(upgradeChance).toBeUndefined();
  expect(chanceSubsMatch).toBeUndefined();
});

test("calculates chance with substats", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: true,
      type: Types.Flower,
      mainStat: Stats.HPFlat,
      subStats: { [Stats.CD]: 5, [Stats.EM]: 40 },
    });

  expect(chance).toBeGreaterThan(0);
  expect(upgradeChance).toBeGreaterThan(0);
  expect(chanceSubsMatch).toBeGreaterThan(0);
});

test("calculates chance with acceptBothSets: false", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: false,
      type: Types.Flower,
      mainStat: Stats.HPFlat,
      subStats: { [Stats.CD]: 5, [Stats.EM]: 40 },
    });

  expect(chance).toBeGreaterThan(0);
  expect(upgradeChance).toBeGreaterThan(0);
  expect(chanceSubsMatch).toBeGreaterThan(0);
});

test("calculates chance for Plume", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: true,
      type: Types.Plume,
      mainStat: Stats.ATKFlat,
      subStats: { [Stats.CD]: 5, [Stats.EM]: 40 },
    });

  expect(chance).toBeGreaterThan(0);
  expect(upgradeChance).toBeGreaterThan(0);
  expect(chanceSubsMatch).toBeGreaterThan(0);
});

test("calculates chance for Sands with ATK%", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: true,
      type: Types.Sands,
      mainStat: Stats.ATK,
      subStats: { [Stats.CD]: 5, [Stats.EM]: 40 },
    });

  expect(chance).toBeGreaterThan(0);
  expect(upgradeChance).toBeGreaterThan(0);
  expect(chanceSubsMatch).toBeGreaterThan(0);
});

test("calculates chance for Sands with EM", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: true,
      type: Types.Sands,
      mainStat: Stats.EM,
      subStats: { [Stats.CD]: 5, [Stats.ATK]: 10 },
    });

  expect(chance).toBeGreaterThan(0);
  expect(upgradeChance).toBeGreaterThan(0);
  expect(chanceSubsMatch).toBeGreaterThan(0);
});

test("calculates chance for Goblet", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: true,
      type: Types.Goblet,
      mainStat: Stats.Dendro,
      subStats: { [Stats.CD]: 5, [Stats.CR]: 10 },
    });

  expect(chance).toBeGreaterThan(0);
  expect(upgradeChance).toBeGreaterThan(0);
  expect(chanceSubsMatch).toBeGreaterThan(0);
});

test("calculates chance for Circlet", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: true,
      type: Types.Circlet,
      mainStat: Stats.CR,
      subStats: { [Stats.CD]: 25 },
    });

  expect(chance).toBeGreaterThan(0);
  expect(upgradeChance).toBeGreaterThan(0);
  expect(chanceSubsMatch).toBeGreaterThan(0);
});

test("chance for impossible request is zero", async () => {
  const workerInstance = getWorker();

  const { chance, upgradeChance, chanceSubsMatch } =
    await workerInstance.calculateChance({
      acceptBothSets: true,
      type: Types.Sands,
      mainStat: Stats.EM,
      subStats: { [Stats.CD]: 100 },
    });

  expect(chance).toBe(0);
  expect(upgradeChance).toBe(0);
  expect(chanceSubsMatch).toBeGreaterThan(0);
});

test("default parameters", async () => {
  const workerInstance = getWorker();

  const { chance } = await workerInstance.calculateChance({
    acceptBothSets: true,
    type: Types.Plume,
    mainStat: Stats.ATKFlat,
  });

  expect(chance).toBeGreaterThan(0);
});
