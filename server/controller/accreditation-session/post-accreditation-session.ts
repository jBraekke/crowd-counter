import { Request, Response } from "express";
import { createAccreditationSession } from "../../model/accreditation-session";

export const initiateAccredidationSession = async (req: Request, res: Response) => {
  const area = req.body.area;

  const session = await createAccreditationSession(area);

  if(session.length > 0) {
    return res.status(200).json({sessionId: session})
  }

  return res.status(400);
};
