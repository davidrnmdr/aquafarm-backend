import { BusinessPartner } from "./businessPartner";
import { Employee } from "./employee";

export class Sale {
  constructor(
    public value: number,
    public partner: BusinessPartner,
    public date: Date,
    public quantity: number,
    public employee: Employee,
    public id?: string
  ) {}
}
