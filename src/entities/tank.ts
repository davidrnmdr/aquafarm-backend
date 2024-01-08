import { FishSpecie } from "./fishSpecie";

export class Tank {
  constructor(
    public fishSpecie: FishSpecie,
    public type: string,
    public location: string,
    public status: number,
    public capacity: number,
    public id?: string
  ) {}
}
