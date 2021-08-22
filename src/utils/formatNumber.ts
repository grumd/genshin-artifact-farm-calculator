import _ from "lodash/fp";

export const getMeaningfulPercents = (value: number): string => {
  let formattedChance: string = "0%";
  if (_.isNil(value)) {
    return "";
  }
  if (value === 0) {
    return formattedChance;
  }
  let n = 0,
    num = 0;
  while (n < 12) {
    num = value * 100 * Math.pow(10, n);
    if (num > 1) {
      break;
    }
    n++;
  }
  return (value * 100).toFixed(n + 2) + "%";
};
