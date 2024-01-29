export class WrongTypeError extends Error {
  public readonly name = "WrongTypeError";

  constructor() {
    super("The passed argument is not of the right type for this call.");
    Object.setPrototypeOf(this, WrongTypeError.prototype);
  }
}
