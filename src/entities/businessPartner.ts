export class BusinessPartner {
  constructor(
    public ein: number,
    public email: string,
    public name: string,
    public address: string,
    public id?: string
  ) {}
}
