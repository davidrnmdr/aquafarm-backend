export class UnableToFindError extends Error {
  public readonly name = "UnableToFindError";

  constructor() {
    super("Unable To Find The Requested Informations.");
  }
}
