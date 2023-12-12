import { BusinessPartner } from "./businessPartner";

export class Treatment {
  constructor(
    public name: string,
    public cost: number,
    public storage: number = 0,
    public expirationDate: Date,
    public seller: BusinessPartner,
    public id?: string
  ) {}
}
