import { BusinessPartner } from "./businessPartner";

export class Sale {
  constructor(
    public value: number,
    public partner: BusinessPartner,
    public date: Date,
    public quantity: number,
    public id?: string
  ) {}
}
