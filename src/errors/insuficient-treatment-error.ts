export class InsuficientTreatmentError extends Error {
  public readonly name = "InsuficientTreatmentError";

  constructor() {
    super("Insuficient Treatment.");
    Object.setPrototypeOf(this, InsuficientTreatmentError.prototype);
  }
}
