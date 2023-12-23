import { Employee } from "./employee";
import { Treatment } from "./treatment";
import { Tank } from "./tank";

export class Medication {
  constructor(
    public employee: Employee,
    public tank: Tank,
    public treatment: Treatment,
    public quantity: number,
    public dateTime: Date,
    public id?: string
  ) {}
}
