export enum SeverityEnum {
  Unknown = 0,
  Cool = 1,
  NotOkey = 2,
  TicketLevel = 3,
}

export const Severity: typeof SeverityEnum = {
  Unknown: SeverityEnum.Unknown,
  Cool: SeverityEnum.Cool,
  NotOkey: SeverityEnum.NotOkey,
  TicketLevel: SeverityEnum.TicketLevel,
}