"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredFoodError = void 0;
class ExpiredFoodError extends Error {
    name = "ExpiredFoodError";
    constructor() {
        super("Food Expiration Date Already Passed.");
        Object.setPrototypeOf(this, ExpiredFoodError.prototype);
    }
}
exports.ExpiredFoodError = ExpiredFoodError;
