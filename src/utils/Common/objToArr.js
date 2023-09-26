export const objToArr = (obj) => {
  const arr = Object.entries(obj).map(([key, value]) => ({ [key]: value }));
  return arr;
};
