"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuficientFoodError = void 0;
class InsuficientFoodError extends Error {
    name = "InsuficientFoodError";
    constructor() {
        super("Insuficient Food.");
        Object.setPrototypeOf(this, InsuficientFoodError.prototype);
    }
}
exports.InsuficientFoodError = InsuficientFoodError;
