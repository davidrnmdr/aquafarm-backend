export class DuplicatePartnerError extends Error {
  public readonly name = "DuplicatePartnerError";

  constructor() {
    super("Duplicate Business Partner.");
  }
}
