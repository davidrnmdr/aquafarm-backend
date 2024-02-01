"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TankNotFoundError = void 0;
class TankNotFoundError extends Error {
    name = "TankNotFoundError";
    constructor() {
        super("Tank Not Found.");
        Object.setPrototypeOf(this, TankNotFoundError.prototype);
    }
}
exports.TankNotFoundError = TankNotFoundError;
