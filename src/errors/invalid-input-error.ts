export class InvalidInputError extends Error {
  public readonly name = "InvalidInputError";

  constructor() {
    super("The Provided Input Does Not Have A Valid Value.");
  }
}
