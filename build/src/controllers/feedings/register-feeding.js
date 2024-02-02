"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFeedingController = void 0;
const invalid_input_error_1 = require("../../errors/invalid-input-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
const tank_not_found_error_1 = require("../../errors/tank-not-found-error");
const employee_not_found_error_1 = require("../../errors/employee-not-found-error");
const food_not_found_error_1 = require("../../errors/food-not-found-error");
const insuficient_food_error_1 = require("../../errors/insuficient-food-error");
const expired_food_error_1 = require("../../errors/expired-food-error");
async function registerFeedingController(req, res) {
    try {
        const id = await app_factory_1.default.registerFeeding(req.body.tankId, req.body.employeeEmail, req.body.foodId, req.body.quantity);
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
            message: `Could not register feeding.`,
        });
    }
}
exports.registerFeedingController = registerFeedingController;
function isKnownError(e) {
    return (e instanceof invalid_input_error_1.InvalidInputError ||
        e instanceof tank_not_found_error_1.TankNotFoundError ||
        e instanceof employee_not_found_error_1.EmployeeNotFoundError ||
        e instanceof food_not_found_error_1.FoodNotFoundError ||
        e instanceof insuficient_food_error_1.InsuficientFoodError ||
        e instanceof expired_food_error_1.ExpiredFoodError);
}
