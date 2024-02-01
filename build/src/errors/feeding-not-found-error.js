"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedingNotFoundError = void 0;
class FeedingNotFoundError extends Error {
    name = "FeedingNotFoundError";
    constructor() {
        super("Feeding Not Found.");
        Object.setPrototypeOf(this, FeedingNotFoundError.prototype);
    }
}
exports.FeedingNotFoundError = FeedingNotFoundError;
