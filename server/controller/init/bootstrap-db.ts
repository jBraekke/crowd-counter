import { createParkingRent, ParkingRent } from "../../model/parking-lot-rent";
import { IParkingZone } from "../../interface/IDatabase";

import { ParkingZone, createParkingZone } from "../../model/parking-zone";
import { generateParkingRent } from "./bootstrap-parkinglot-renters";

const defaultParkingZones = [
  {
    name: "P1",
    order: 1,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P2",
    order: 2,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P3",
    order: 3,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P07",
    order: 4,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P09",
    order: 5,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P11",
    order: 6,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P12",
    order: 7,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P13",
    order: 8,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P14",
    order: 9,
    from: null,
    to: null,
    created: new Date(),
  },
  {
    name: "P15",
    order: 10,
    from: null,
    to: null,
    created: new Date(),
  },
] as IParkingZone[];

const createParkingZones = async () => {
  const parkingZones = defaultParkingZones.map((x) => x.name) as string[];

  const dbParkingZones = await ParkingZone.find({
    name: { $in: parkingZones },
  });

  const parkingZoneNames = dbParkingZones.map((x) => x.name);

  parkingZones.forEach((parkingZone) => {
    if (!parkingZoneNames.includes(parkingZone)) {
      const newParkingZone = defaultParkingZones.find(
        (x) => x.name === parkingZone
      );
      newParkingZone && createParkingZone(newParkingZone);
    }
  });
};

const createParkinglotRentals = async () => {
  
  const parkingRents = await ParkingRent.find();
  if (parkingRents.length === 0) {
    const init = generateParkingRent();
    init.forEach((x) => {
      createParkingRent(x);
    });
  }
};

function bootstrapDb() {
  createParkingZones();
  createParkinglotRentals();
}

export default bootstrapDb;
