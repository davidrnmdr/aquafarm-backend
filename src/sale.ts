import { BusinessPartner } from "./businessPartner";

export class Sale {
  constructor(
    public value: number,
    public quantity: number,
    public date: Date,
    public buyer: BusinessPartner,
    public id?: string
  ) {}
}
