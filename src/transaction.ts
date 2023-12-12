import { BusinessPartner } from "./businessPartner";
import { Produtcs } from "./types/Products";

export class Transaction {
  constructor(
    public type: "sale" | "purchase",
    public value: number,
    public partner: BusinessPartner,
    public date: Date,
    public quantity: number | Produtcs
  ) {}
}
