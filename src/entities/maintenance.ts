import { Employee } from "./employee";
import { Equipment } from "./equipment";

export class Maintenance {
  constructor(
    public equipment: Equipment,
    public employee: Employee,
    public date: Date,
    public cost: number,
    public id?: string
  ) {}
}
