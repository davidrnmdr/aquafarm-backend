"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatePartnerError = void 0;
class DuplicatePartnerError extends Error {
    name = "DuplicatePartnerError";
    constructor() {
        super("Duplicate Business Partner.");
        Object.setPrototypeOf(this, DuplicatePartnerError.prototype);
    }
}
exports.DuplicatePartnerError = DuplicatePartnerError;
