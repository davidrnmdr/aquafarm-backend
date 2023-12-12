import { BusinessPartner } from "./businessPartner";

export class Equipment {
  constructor(
    public type: string,
    public status: string,
    public location: string,
    public seller: BusinessPartner,
    public price: number,
    public maintenanceCost: number = 0,
    public id?: string
  ) {}
}
