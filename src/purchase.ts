import { BusinessPartner } from "./businessPartner";
import { Produtcs } from "./types/Products";

export class Purchase {
  constructor(
    public products: Produtcs,
    public seller: BusinessPartner,
    public value: number,
    public date: Date,
    public id?: string
  ) {}
}
