export class FeedingNotFoundError extends Error {
  public readonly name = "FeedingNotFoundError";

  constructor() {
    super("Feeding Not Found.");
    Object.setPrototypeOf(this, FeedingNotFoundError.prototype);
  }
}
