export class EquipmentNotFoundError extends Error {
  public readonly name = "EquipmentNotFoundError";

  constructor() {
    super("Equipment Not Found.");
  }
}
