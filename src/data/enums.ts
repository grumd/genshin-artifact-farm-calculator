export enum Types {
  Flower = "Flower of Life",
  Plume = "Plume of Death",
  Sands = "Sands of Eon",
  Goblet = "Goblet of Eonothem",
  Circlet = "Circlet of Logos",
}

export enum Stats {
  HPFlat = "HP",
  HP = "HP%",
  ATKFlat = "ATK",
  ATK = "ATK%",
  DEFFlat = "DEF", // not main
  DEF = "DEF%",
  CR = "CRIT Rate%",
  CD = "CRIT DMG%",
  ER = "Energy Recharge%",
  EM = "Elemental Mastery",
  // not sub
  HB = "Healing Bonus%",
  Pyro = "Pyro DMG Bonus%",
  Electro = "Electro DMG Bonus%",
  Cryo = "Cryo DMG Bonus%",
  Hydro = "Hydro DMG Bonus%",
  Anemo = "Anemo DMG Bonus%",
  Geo = "Geo DMG Bonus%",
  Physical = "Physical DMG Bonus%",
}

export type SubStats =
  | Stats.HPFlat
  | Stats.HP
  | Stats.ATKFlat
  | Stats.ATK
  | Stats.DEFFlat
  | Stats.DEF
  | Stats.CR
  | Stats.CD
  | Stats.ER
  | Stats.EM;

export type MainStats =
  | Stats.HPFlat
  | Stats.HP
  | Stats.ATKFlat
  | Stats.ATK
  | Stats.DEF
  | Stats.CR
  | Stats.CD
  | Stats.ER
  | Stats.EM
  | Stats.HB
  | Stats.Pyro
  | Stats.Electro
  | Stats.Cryo
  | Stats.Hydro
  | Stats.Anemo
  | Stats.Geo
  | Stats.Physical;
