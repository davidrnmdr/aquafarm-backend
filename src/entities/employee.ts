export class Employee {
  constructor(
    public name: string,
    public email: string,
    public role: string,
    public password: string,
    public id?: string
  ) {}
}
