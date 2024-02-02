"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeNotFoundError = void 0;
class EmployeeNotFoundError extends Error {
    name = "EmployeeNotFoundError";
    constructor() {
        super("Employee Not Found.");
        Object.setPrototypeOf(this, EmployeeNotFoundError.prototype);
    }
}
exports.EmployeeNotFoundError = EmployeeNotFoundError;
