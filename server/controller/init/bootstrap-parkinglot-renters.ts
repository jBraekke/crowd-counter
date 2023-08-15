import { IParkingRent } from "../../interface/IParkingRent";

export const generateParkingRent = () => {
  const regNumbers = [] as IParkingRent[];
  for (let index = 0; index < 50; index++) {
    const regnumber = `${randomLetter()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}`;
    regNumbers.push({ carId: regnumber, area: "P1" });
  }

  return regNumbers;
};

const randomLetter = () => {
  const firstletters = ['AA', 'AJ', 'AY', 'ZZ', 'EL', 'EV', 'EK', 'AY', 'BD', 'RH']
  const randomLetterIndex = Math.floor(Math.random() * firstletters.length)
  return firstletters[randomLetterIndex];
};
const randomNumber = () => {
  return Math.floor(Math.random() * 10);
};
