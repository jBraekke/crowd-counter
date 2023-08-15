interface IParkingZone {
  name: string;
  order: number;
  from?: Date;
  to?: Date;
  created: Date;
}

export { IParkingZone };
