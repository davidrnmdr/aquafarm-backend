"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEmployeeByEmailController = void 0;
const employee_not_found_error_1 = require("../../errors/employee-not-found-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function findEmployeeByEmailController(req, res) {
    try {
        const retrievedEmployee = await app_factory_1.default.findEmployee(req.body.email);
        res.status(200).json({ retrievedEmployee });
    }
    catch (e) {
        if (e instanceof employee_not_found_error_1.EmployeeNotFoundError) {
            res.status(404).json({
                message: "Could not find employee.",
            });
            return;
        }
        res.status(500).json({
            message: `Internal server error.`,
        });
    }
}
exports.findEmployeeByEmailController = findEmployeeByEmailController;
