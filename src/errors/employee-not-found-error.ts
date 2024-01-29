export class EmployeeNotFoundError extends Error {
  public readonly name = "EmployeeNotFoundError";

  constructor() {
    super("Employee Not Found.");
    Object.setPrototypeOf(this, EmployeeNotFoundError.prototype);
  }
}
