import { getNumbers } from './getNumbers';

export const getMinMax = (totals) => {
  return totals.map((i, index) => {
    const arrMaxMin = getNumbers(i?.value);
    let min, max;
    if (index === 0) {
      min = 0;
      max = arrMaxMin.length === 1 ? arrMaxMin[0] : arrMaxMin[1];
    } else {
      min = arrMaxMin[0];
      max = arrMaxMin[1];
    }
    if (index === totals.length - 1) {
      min = arrMaxMin.length === 1 ? arrMaxMin[0] : min;
      max = Number.POSITIVE_INFINITY;
    }
    return {
      ...i,
      min: min,
      max: max,
    };
  });
};

export const getCodes = (arrMinMax, totals) => {
  const getCodeWithMinMax = getMinMax(totals);
  return getCodeWithMinMax.filter(
    (i) => (i?.min >= arrMinMax[0] && i?.min <= arrMinMax[1]) || (i?.max > arrMinMax[0] && i?.max <= arrMinMax[1]),
  );
};

export const getCodesWithNumber = (num, totals) => {
  if (totals) {
    const maxMin = getMinMax(totals);
    return maxMin?.find((i) => i.max >= num && i.min < num);
  }
};
