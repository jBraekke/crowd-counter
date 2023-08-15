import mongoose, { Schema } from "mongoose";
import { IAccreditationLog } from "server/interface/IAccreditationLog";
import { SeverityEnum } from "../enum/severity";
import { IAccreditationSession } from "../interface/IAccreditationSession";

const accreditationLog = new Schema({
  logId: { type: String, unique: true },
  carId: String,
  sessionId: String,
  area: String,
  created: { type: Date, default: Date.now },
  severity: {
    type: Number,
    enum: [
      SeverityEnum.Unknown,
      SeverityEnum.Cool,
      SeverityEnum.NotOkey,
      SeverityEnum.TicketLevel,
    ],
    default: SeverityEnum.Unknown,
  },
});

export const AccreditationLog = mongoose.model(
  "AccreditationLog",
  accreditationLog
);

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function findAccreditationLogItem (carId: string, sessionId: string) {
  const logItem = await AccreditationLog.findOne({carId: carId, sessionId: sessionId});
  return logItem;
}

export async function createAccreditationLog(
  carId: string,
  session: IAccreditationSession,
  severity: SeverityEnum
) {
  const item = new AccreditationLog();
  item.logId = uuid();
  item.carId = carId;
  item.sessionId = session.sessionId;
  item.area = session.area;
  item.severity = severity;
  await item.save();

  return item as IAccreditationLog;
}
