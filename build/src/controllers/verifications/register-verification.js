"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVerificationController = void 0;
const invalid_input_error_1 = require("../../errors/invalid-input-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
const tank_not_found_error_1 = require("../../errors/tank-not-found-error");
const employee_not_found_error_1 = require("../../errors/employee-not-found-error");
async function registerVerificationController(req, res) {
    try {
        const id = await app_factory_1.default.registerVerification(req.body.tankId, req.body.employeeEmail, req.body.temperature, req.body.oxygen, req.body.ph);
        res.status(201).json({ id });
    }
    catch (e) {
        if (e instanceof invalid_input_error_1.InvalidInputError ||
            e instanceof tank_not_found_error_1.TankNotFoundError ||
            e instanceof employee_not_found_error_1.EmployeeNotFoundError) {
            res.status(400).json({
                message: e.message,
            });
            return;
        }
        res.status(500).json({
            message: `Could not register verification.`,
        });
    }
}
exports.registerVerificationController = registerVerificationController;
