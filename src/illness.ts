import { Treatment } from "./treatment";

export class Illness {
  constructor(
    public name: string,
    public treatment: Treatment,
    public id?: string
  ) {}
}
