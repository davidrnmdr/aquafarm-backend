import { BusinessPartner } from "./businessPartner";

export class Food {
  constructor(
    public type: string,
    public storage: number,
    public expirationDate: Date,
    public cost: number,
    public seller: BusinessPartner,
    public id?: string
  ) {}
}
