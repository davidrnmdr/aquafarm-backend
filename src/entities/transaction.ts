import { BusinessPartner } from "./businessPartner";
import { Food } from "./food";
import { Treatment } from "./treatment";

interface Transaction {
  value: number;
  partner: BusinessPartner;
  date: Date;
}

export class Sale implements Transaction {
  constructor(
    public value: number,
    public partner: BusinessPartner,
    public date: Date,
    public quantity: number
  ) {}
}

export class Purchase implements Transaction {
  constructor(
    public value: number,
    public partner: BusinessPartner,
    public date: Date,
    public food: Food | null,
    public treatment: Treatment | null
  ) {}
}
