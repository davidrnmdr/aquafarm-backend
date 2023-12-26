export class InsuficientFoodError extends Error {
  public readonly name = "InsuficientFoodError";

  constructor() {
    super("Insuficient Food.");
  }
}
