export class ExpiredFoodError extends Error {
  public readonly name = "ExpiredFoodError";

  constructor() {
    super("Food Expiration Date Already Passed.");
  }
}
