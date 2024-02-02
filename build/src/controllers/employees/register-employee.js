"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEmployeeController = void 0;
const duplicate_employee_error_1 = require("../../errors/duplicate-employee-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function registerEmployeeController(req, res) {
    try {
        const id = await app_factory_1.default.registerEmployee(req.body);
        res.status(201).json({ id });
    }
    catch (e) {
        if (e instanceof duplicate_employee_error_1.DuplicatedEmployeeError) {
            res.status(400).json({
                message: "Could not register employee.",
            });
            return;
        }
        res.status(500).json({
            message: `Could not register employee.`,
        });
    }
}
exports.registerEmployeeController = registerEmployeeController;
