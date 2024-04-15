export const arrayEquals = (
  array1: unknown[],
  array2: unknown[],
  ignoreOrder?: boolean
) => {
  if (array1.length !== array2.length) {
    return false;
  }

  if (ignoreOrder) {
    return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
  }

  return JSON.stringify(array1) === JSON.stringify(array2);
};
