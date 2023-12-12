import { Employee } from "./employee";
import { Tank } from "./tank";
import { TankMetrics } from "../types/TankMetrics";

export class TankVerification {
  constructor(
    public tank: Tank,
    public employee: Employee,
    public oxygen: number,
    public metrics: TankMetrics,
    public date: Date,
    public id?: string
  ) {}
}
