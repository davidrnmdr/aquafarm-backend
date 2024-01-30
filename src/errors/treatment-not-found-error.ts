export class TreatmentNotFoundError extends Error {
  public readonly name = "TreatmentNotFoundError";

  constructor() {
    super("Treatment Not Found.");
    Object.setPrototypeOf(this, TreatmentNotFoundError.prototype);
  }
}
