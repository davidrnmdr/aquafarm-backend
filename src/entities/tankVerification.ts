import { Employee } from "./employee";
import { Tank } from "./tank";

export class TankVerification {
  constructor(
    public tank: Tank,
    public employee: Employee,
    public temperature: number,
    public oxygen: number,
    public ph: number,
    public date: Date,
    public id?: string
  ) {}
}
