export class InsuficientPermissionError extends Error {
  public readonly name = "InsuficientPermissionError()";

  constructor() {
    super("Current User Has Insuficient Permission To This Operation.");
  }
}
