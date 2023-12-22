export class EmployeeNotFoundError extends Error {
  public readonly name = "EmployeeNotFoundError";

  constructor() {
    super("Employee Not Found.");
  }
}
