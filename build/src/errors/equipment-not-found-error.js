"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentNotFoundError = void 0;
class EquipmentNotFoundError extends Error {
    name = "EquipmentNotFoundError";
    constructor() {
        super("Equipment Not Found.");
        Object.setPrototypeOf(this, EquipmentNotFoundError.prototype);
    }
}
exports.EquipmentNotFoundError = EquipmentNotFoundError;
