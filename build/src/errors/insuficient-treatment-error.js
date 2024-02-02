"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuficientTreatmentError = void 0;
class InsuficientTreatmentError extends Error {
    name = "InsuficientTreatmentError";
    constructor() {
        super("Insuficient Treatment.");
        Object.setPrototypeOf(this, InsuficientTreatmentError.prototype);
    }
}
exports.InsuficientTreatmentError = InsuficientTreatmentError;
