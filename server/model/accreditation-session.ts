import mongoose, { Schema } from "mongoose";
import { IAccreditationSession } from "../interface/IAccreditationSession";

const accredidationSession = new Schema({
  sessionId: { type: String, unique: true },
  area: String,
  created: { type: Date, default: Date.now },
  ended: { type: Date, default: undefined },
});

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const AccredidationSession = mongoose.model(
  "AccredidationSession",
  accredidationSession
);

export async function endAllOtherSessions() {
  await AccredidationSession.updateMany(
    {
      ended: null,
    },
    {
      $set: {
        ended: new Date(),
      },
    },
    {
      multi: true,
    }
  );
}

export async function findCurrentSession() {
  const session = await AccredidationSession.findOne({ ended: { $eq: null } });
  return session;
}

export async function createAccreditationSession(area: string) {
  await endAllOtherSessions();

  const item = new AccredidationSession();
  item.sessionId = uuid();
  item.area = area;
  item.ended = null;
  await item.save();

  return item.sessionId;
}
