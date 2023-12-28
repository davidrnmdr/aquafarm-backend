import { BusinessPartner } from "./businessPartner";

export class Equipment {
  constructor(
    public type: string,
    public status: string,
    public location: string,
    public seller: BusinessPartner,
    public totalMaintenanceCost: number = 0,
    public cost: number,
    public quantity: number,
    public id?: string
  ) {}
}
