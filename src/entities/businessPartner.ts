import { Food } from "./food";
import { Treatment } from "./treatment";

export class BusinessPartner {
  constructor(
    public ein: number,
    public email: string,
    public name: string,
    public address: string,
    public id?: string
  ) {}
}
