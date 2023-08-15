import mongoose, { Schema } from "mongoose";
import { IParkingZone } from "server/interface/IDatabase";

const schema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  order: Number,
  from: { type: Date, default: undefined },
  to: { type: Date, default: undefined },
  created: Date,
});

export const ParkingZone = mongoose.model("ParkingZone", schema);

function createParkingZone(parkingZone: IParkingZone) {
  const newParkingZone = new ParkingZone(parkingZone);

  newParkingZone.created = new Date();
  newParkingZone.save();
}

const findParkingZones = async () => {
  const dbParkingZones = await ParkingZone.find().sort({'order': 1});

  return dbParkingZones.map(x => x.name);
};

export { createParkingZone, findParkingZones };
