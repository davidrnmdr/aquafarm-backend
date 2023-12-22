export class DuplicatedEmployeeError extends Error {
  public readonly name = "DuplicatedEmployeeError";

  constructor() {
    super("Duplicate Employee.");
  }
}
