export class TankNotFoundError extends Error {
  public readonly name = "TankNotFoundError";

  constructor() {
    super("Tank Not Found.");
    Object.setPrototypeOf(this, TankNotFoundError.prototype);
  }
}
