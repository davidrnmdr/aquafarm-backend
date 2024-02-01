"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInputError = void 0;
class InvalidInputError extends Error {
    name = "InvalidInputError";
    constructor() {
        super("The Provided Input Does Not Have A Valid Value.");
        Object.setPrototypeOf(this, InvalidInputError.prototype);
    }
}
exports.InvalidInputError = InvalidInputError;
