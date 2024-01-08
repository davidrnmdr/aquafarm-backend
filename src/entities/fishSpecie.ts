import { Range } from "../types/range";

export class FishSpecie {
  constructor(
    public name: string,
    public foodType: string,
    public temperatureRange: Range,
    public oxygenRange: Range,
    public phRange: Range
  ) {}
}
