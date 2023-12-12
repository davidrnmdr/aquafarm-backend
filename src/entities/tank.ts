import { Feeding } from "./feeding";
import { TankVerification } from "./tankVerification";

export class Tank {
  constructor(
    public type: string,
    public location: string,
    public status: number,
    public capacity: number,
    public id?: string
  ) {}
}