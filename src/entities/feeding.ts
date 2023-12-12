import { Employee } from "./employee";
import { Food } from "./food";
import { Tank } from "./tank";

export class Feeding {
  constructor(
    public employee: Employee,
    public tank: Tank,
    public food: Food,
    public quantity: number,
    public dateTime: Date,
    public id?: string
  ) {}
}
