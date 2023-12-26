export class FoodNotFoundError extends Error {
  public readonly name = "FoodNotFoundError";

  constructor() {
    super("Food Not Found.");
  }
}
