"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMedicationController = void 0;
const invalid_input_error_1 = require("../../errors/invalid-input-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
const tank_not_found_error_1 = require("../../errors/tank-not-found-error");
const employee_not_found_error_1 = require("../../errors/employee-not-found-error");
const treatment_not_found_error_1 = require("../../errors/treatment-not-found-error");
const insuficient_treatment_error_1 = require("../../errors/insuficient-treatment-error");
const expired_treatment_error_1 = require("../../errors/expired-treatment-error");
async function registerMedicationController(req, res) {
    try {
        const id = await app_factory_1.default.registerMedication(req.body.tankId, req.body.employeeEmail, req.body.treatmentId, req.body.quantity);
        res.status(201).json({ id });
    }
    catch (e) {
        if (isKnownError(e)) {
            res.status(400).json({
                message: e.message,
            });
            return;
        }
        res.status(500).json({
            message: `Could not register medication.`,
        });
    }
}
exports.registerMedicationController = registerMedicationController;
function isKnownError(e) {
    return (e instanceof invalid_input_error_1.InvalidInputError ||
        e instanceof tank_not_found_error_1.TankNotFoundError ||
        e instanceof employee_not_found_error_1.EmployeeNotFoundError ||
        e instanceof treatment_not_found_error_1.TreatmentNotFoundError ||
        e instanceof insuficient_treatment_error_1.InsuficientTreatmentError ||
        e instanceof expired_treatment_error_1.ExpiredTreatmentError);
}
