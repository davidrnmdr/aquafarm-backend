import { Produtcs } from "./types/Products";

export class BusinessPartner {
  constructor(
    public ein: number,
    public email: string,
    public name: string,
    public adress: string,
    public products: Produtcs,
    public id?: string
  ) {}
}
