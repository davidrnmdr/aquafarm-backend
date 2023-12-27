export class ExpiredTreatmentError extends Error {
  public readonly name = "ExpiredTreatmentError";

  constructor() {
    super("Treatment Expiration Date Already Passed.");
  }
}
