export class PartnerNotFoundError extends Error {
  public readonly name = "PartnerNotFoundError";

  constructor() {
    super("Business Partner Not Found.");
    Object.setPrototypeOf(this, PartnerNotFoundError.prototype);
  }
}
