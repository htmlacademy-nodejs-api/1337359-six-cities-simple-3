export const generateRandomInt = (max: number, min = 1): number => Math.floor(Math.random() * (max - min + 1)) + min;
export const generateRandomFloat = (max: number, min = 0, decimal: number): number => +(Math.random() * (max - min) + min).toFixed(decimal);

export const getRandomItem = <T>(arr: T[]): T => arr[generateRandomInt(arr.length) - 1];

export const getRandomArr = <T>(arr: T[], dimension: number = generateRandomInt(arr.length)): T[] => {
  let count = 0;
  const result:T[] = [];

  while (count < dimension) {
    const item = getRandomItem(arr);

    if (!result.find((it) => it === item)) {
      result.push(item);
      count++;
    }
  }

  return result;
};

export const getPrettyNumber = (value: number, digits = 1): number => Math.round(value / (10 ** digits)) * (10 ** digits);
