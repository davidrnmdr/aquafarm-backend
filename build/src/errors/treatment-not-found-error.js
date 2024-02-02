"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentNotFoundError = void 0;
class TreatmentNotFoundError extends Error {
    name = "TreatmentNotFoundError";
    constructor() {
        super("Treatment Not Found.");
        Object.setPrototypeOf(this, TreatmentNotFoundError.prototype);
    }
}
exports.TreatmentNotFoundError = TreatmentNotFoundError;
