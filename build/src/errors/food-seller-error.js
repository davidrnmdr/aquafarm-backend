"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodSellerError = void 0;
class FoodSellerError extends Error {
    name = "FoodSellerError";
    constructor() {
        super("The Specified Business Partner Does Not Sells This Particular Food");
        Object.setPrototypeOf(this, FoodSellerError.prototype);
    }
}
exports.FoodSellerError = FoodSellerError;
