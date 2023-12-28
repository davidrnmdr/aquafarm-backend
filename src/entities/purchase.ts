import { BusinessPartner } from "./businessPartner";
import { Employee } from "./employee";
import { Equipment } from "./equipment";
import { Food } from "./food";
import { Treatment } from "./treatment";

export class Purchase {
  constructor(
    public value: number,
    public partner: BusinessPartner,
    public date: Date,
    public food: Food | null,
    public treatment: Treatment | null,
    public equipment: Equipment | null,
    public employee: Employee,
    public id?: string
  ) {}
}
