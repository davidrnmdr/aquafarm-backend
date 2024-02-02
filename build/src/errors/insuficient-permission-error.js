"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuficientPermissionError = void 0;
class InsuficientPermissionError extends Error {
    name = "InsuficientPermissionError()";
    constructor() {
        super("Current User Has Insuficient Permission To This Operation.");
        Object.setPrototypeOf(this, InsuficientPermissionError.prototype);
    }
}
exports.InsuficientPermissionError = InsuficientPermissionError;
