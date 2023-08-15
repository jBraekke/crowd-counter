import { Request, Response } from "express";
import { createUser, updateUser } from "../../model/crowdUser";
import { UserStatusEnum } from "../../enum/user-status";

export const validateCar = async (req: Request, res: Response) => {
  const {userID, status} = await createUser();

  if(userID) {
    return res.status(200).json({userID, status })
  }

  return res.status(400);
};

export const setEger = async (req: Request, res: Response) => {
  const {userID, status} = await updateUser(req.body.userId, UserStatusEnum.Eger);

  if(userID) {
    return res.status(200).json({userID, status })
  }

  return res.status(400);
};

export const setCool = async (req: Request, res: Response) => {
  const {userID, status} = await updateUser(req.body.userId, UserStatusEnum.Cool);

  if(userID) {
    return res.status(200).json({userID, status })
  }

  return res.status(400);
};
