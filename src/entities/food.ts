import { BusinessPartner } from "./businessPartner";

export class Food {
  constructor(
    public type: string,
    public quantity: number,
    public cost: number,
    public expirationDate: Date,
    public seller: BusinessPartner,
    public id?: string
  ) {}
}
