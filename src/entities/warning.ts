import { WarningDetails } from "../types/warningDetails";
import { Tank } from "./tank";

export class Warning {
  constructor(
    public tank: Tank,
    public msg: string,
    public details: WarningDetails,
    public id?: string
  ) {}
}
