"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongTypeError = void 0;
class WrongTypeError extends Error {
    name = "WrongTypeError";
    constructor() {
        super("The passed argument is not of the right type for this call.");
        Object.setPrototypeOf(this, WrongTypeError.prototype);
    }
}
exports.WrongTypeError = WrongTypeError;
