import mongoose, { Schema } from "mongoose";
import { IParkingRent } from "server/interface/IParkingRent";

const parkingRentSchema = new Schema({
  carId: { type: String, unique: true },
  area: String,
  from: String,
  to: String,
  created: { type: Date, default: Date.now },
});

export const ParkingRent = mongoose.model("ParkingRent", parkingRentSchema);

export async function createParkingRent(carRent: IParkingRent) {
  const deviation = new ParkingRent(carRent);
  await deviation.save();
}

export async function validateRentalRelation(carId: string) {
  return await ParkingRent.findOne({
    carId: carId
  });
}
