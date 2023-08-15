import { Request, Response } from "express";
import { findParkingZones } from "../../model/parking-zone";
import { findAllUsers } from "../../model/crowdUser";

export const getParkingZones = async (
    res: Response
  ) => {
    const parkingZones = await findParkingZones();
    res.json(parkingZones);
  }

  export const getUsers = async (
    res: Response
  ) => {
    const users = await findAllUsers();
    res.json(users);
  }