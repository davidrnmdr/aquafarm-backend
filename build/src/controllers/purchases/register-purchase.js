"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPurchaseController = void 0;
const invalid_input_error_1 = require("../../errors/invalid-input-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
const employee_not_found_error_1 = require("../../errors/employee-not-found-error");
const partner_not_found_error_1 = require("../../errors/partner-not-found-error");
const food_not_found_error_1 = require("../../errors/food-not-found-error");
const treatment_not_found_error_1 = require("../../errors/treatment-not-found-error");
const equipment_not_found_error_1 = require("../../errors/equipment-not-found-error");
async function registerPurchaseController(req, res) {
    try {
        const id = await app_factory_1.default.registerPurchase(req.body.value, req.body.partnerEin, req.body.foodId, req.body.treatmentId, req.body.equipmentId, req.body.employeeEmail);
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
            message: `Could not register purchase.`,
        });
    }
}
exports.registerPurchaseController = registerPurchaseController;
function isKnownError(e) {
    return (e instanceof invalid_input_error_1.InvalidInputError ||
        e instanceof employee_not_found_error_1.EmployeeNotFoundError ||
        e instanceof partner_not_found_error_1.PartnerNotFoundError ||
        e instanceof food_not_found_error_1.FoodNotFoundError ||
        e instanceof treatment_not_found_error_1.TreatmentNotFoundError ||
        e instanceof equipment_not_found_error_1.EquipmentNotFoundError);
}
