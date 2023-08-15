export enum UserStatusEnum {
    Unknown = 0,
    Idle = 1,
    Eger = 2,
    Cool = 3,
  }

  export interface IUser{
    userID: string,
    status: UserStatusEnum,
  }