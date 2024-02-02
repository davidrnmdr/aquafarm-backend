"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredTreatmentError = void 0;
class ExpiredTreatmentError extends Error {
    name = "ExpiredTreatmentError";
    constructor() {
        super("Treatment Expiration Date Already Passed.");
        Object.setPrototypeOf(this, ExpiredTreatmentError.prototype);
    }
}
exports.ExpiredTreatmentError = ExpiredTreatmentError;
