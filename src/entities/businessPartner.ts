import { Produtcs } from "../types/Products";
import { Food } from "./food";
import { Treatment } from "./treatment";

export class BusinessPartner {
  constructor(
    public ein: number,
    public email: string,
    public name: string,
    public adress: string,
    public foods: Food[] = [],
    public treatments: Treatment[] = [],
    public id?: string
  ) {}
}
