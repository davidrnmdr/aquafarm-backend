"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerNotFoundError = void 0;
class PartnerNotFoundError extends Error {
    name = "PartnerNotFoundError";
    constructor() {
        super("Business Partner Not Found.");
        Object.setPrototypeOf(this, PartnerNotFoundError.prototype);
    }
}
exports.PartnerNotFoundError = PartnerNotFoundError;
