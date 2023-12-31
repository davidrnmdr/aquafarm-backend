import { BusinessPartner } from "./businessPartner";

export class Treatment {
  constructor(
    public name: string,
    public quantity: number,
    public cost: number,
    public expirationDate: Date,
    public seller: BusinessPartner,
    public id?: string
  ) {}
}
