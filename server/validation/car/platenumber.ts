export const validateCarNumber = (carplate: string) => {
  return carplate.length >= 2 && carplate.length < 8;
};
