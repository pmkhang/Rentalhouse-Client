export const getNumbers = (string) => {
  return string
    .split(' ')
    .map((item) => parseFloat(item))
    .filter((value) => !isNaN(value));
};
