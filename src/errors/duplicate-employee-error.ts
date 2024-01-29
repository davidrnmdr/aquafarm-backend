export class DuplicatedEmployeeError extends Error {
  public readonly name = "DuplicatedEmployeeError";

  constructor() {
    super("Duplicate Employee.");
    Object.setPrototypeOf(this, DuplicatedEmployeeError.prototype);
  }
}
