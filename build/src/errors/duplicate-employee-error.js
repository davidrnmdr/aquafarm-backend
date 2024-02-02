"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedEmployeeError = void 0;
class DuplicatedEmployeeError extends Error {
    name = "DuplicatedEmployeeError";
    constructor() {
        super("Duplicate Employee.");
        Object.setPrototypeOf(this, DuplicatedEmployeeError.prototype);
    }
}
exports.DuplicatedEmployeeError = DuplicatedEmployeeError;
