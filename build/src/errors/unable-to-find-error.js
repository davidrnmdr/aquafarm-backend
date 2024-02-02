"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToFindError = void 0;
class UnableToFindError extends Error {
    name = "UnableToFindError";
    constructor() {
        super("Unable To Find The Requested Informations.");
        Object.setPrototypeOf(this, UnableToFindError.prototype);
    }
}
exports.UnableToFindError = UnableToFindError;
