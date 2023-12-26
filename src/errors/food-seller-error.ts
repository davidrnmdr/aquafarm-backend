export class FoodSellerError extends Error {
  public readonly name = "FoodSellerError";

  constructor() {
    super("The Specified Business Partner Does Not Sells This Particular Food");
  }
}
