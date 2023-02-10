import _ from "lodash/fp";

export const getMeaningfulPercents = (value?: number): string => {
  if (_.isNil(value) || !Number.isFinite(value)) {
    return "";
  }
  if (value === 0) {
    return "0%";
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
  return (value * 100).toFixed(n + 2).replace(/([1-9])?\.?0+$/, "$1") + "%";
};

const rtf =
  Intl &&
  Intl.RelativeTimeFormat &&
  new Intl.RelativeTimeFormat(undefined, {
    style: "short",
    numeric: "always",
  });

export const getResinDays = (value: number) => {
  return rtf ? rtf.format(Math.round(value / 160), "days") : `${value}`;
};
