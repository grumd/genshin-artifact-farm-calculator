import _ from "lodash/fp";
import { MainStats, Stats, SubStats, Types } from "./enums";

const allSubStats: SubStats[] = [
  Stats.CR,
  Stats.CD,
  Stats.ATK,
  Stats.ATKFlat,
  Stats.HP,
  Stats.HPFlat,
  Stats.DEF,
  Stats.DEFFlat,
  Stats.ER,
  Stats.EM,
];

const allMainStats: MainStats[] = [
  Stats.HPFlat,
  Stats.ATKFlat,
  Stats.HP,
  Stats.ATK,
  Stats.DEF,
  Stats.ER,
  Stats.EM,
  Stats.CR,
  Stats.CD,
  Stats.HB,
  Stats.Pyro,
  Stats.Electro,
  Stats.Cryo,
  Stats.Hydro,
  Stats.Anemo,
  Stats.Geo,
  Stats.Physical,
  Stats.Dendro,
];

export type MainStatsByType<Type extends Types> = Type extends Types.Flower
  ? Stats.HPFlat
  : Type extends Types.Plume
  ? Stats.ATKFlat
  : Type extends Types.Sands
  ? Stats.HP | Stats.ATK | Stats.DEF | Stats.ER | Stats.EM
  : Type extends Types.Goblet
  ?
      | Stats.HP
      | Stats.ATK
      | Stats.DEF
      | Stats.Pyro
      | Stats.Electro
      | Stats.Cryo
      | Stats.Hydro
      | Stats.Anemo
      | Stats.Geo
      | Stats.Physical
      | Stats.Dendro
      | Stats.EM
  : Type extends Types.Circlet
  ? Stats.HP | Stats.ATK | Stats.DEF | Stats.CR | Stats.CD | Stats.HB | Stats.EM
  : never;

export type SubStatsByMain<MainStat extends MainStats> = Exclude<
  SubStats,
  MainStat
>;

export const allowedMainStats: { [T in Types]: MainStatsByType<T>[] } = {
  [Types.Flower]: [Stats.HPFlat],
  [Types.Plume]: [Stats.ATKFlat],
  [Types.Sands]: [Stats.HP, Stats.ATK, Stats.DEF, Stats.ER, Stats.EM],
  [Types.Goblet]: [
    Stats.HP,
    Stats.ATK,
    Stats.DEF,
    Stats.Pyro,
    Stats.Electro,
    Stats.Cryo,
    Stats.Hydro,
    Stats.Anemo,
    Stats.Geo,
    Stats.Physical,
    Stats.Dendro,
    Stats.EM,
  ],
  [Types.Circlet]: [
    Stats.HP,
    Stats.ATK,
    Stats.DEF,
    Stats.CR,
    Stats.CD,
    Stats.HB,
    Stats.EM,
  ],
};

// All substats are allowed except for the duplicate of main stat
type AllowedSubStats = Record<MainStats, SubStats[]>;

export const allowedSubStats: AllowedSubStats = allMainStats.reduce(
  (acc, mainStat) => {
    return {
      ...acc,
      [mainStat]: _.without([mainStat], allSubStats),
    };
  },
  {} as AllowedSubStats
);
