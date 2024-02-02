"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodNotFoundError = void 0;
class FoodNotFoundError extends Error {
    name = "FoodNotFoundError";
    constructor() {
        super("Food Not Found.");
        Object.setPrototypeOf(this, FoodNotFoundError.prototype);
    }
}
exports.FoodNotFoundError = FoodNotFoundError;
