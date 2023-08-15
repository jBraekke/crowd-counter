import { SeverityEnum } from "../enum/severity";

export interface IAccreditationLog{
    logId: string,
    carId: string,
    sessionId: string,
    area: string,
    created: Date,
    severity: SeverityEnum
  }