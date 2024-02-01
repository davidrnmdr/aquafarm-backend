"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFoodController = void 0;
const food_not_found_error_1 = require("../../errors/food-not-found-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function removeFoodController(req, res) {
    try {
        await app_factory_1.default.removeFood(req.body.id);
        res.status(200).json("Food removed.");
    }
    catch (e) {
        if (e instanceof food_not_found_error_1.FoodNotFoundError) {
            res.status(404).json({
                message: e.message,
            });
            return;
        }
        res.status(500).json({
            message: `Internal server error.`,
        });
    }
}
exports.removeFoodController = removeFoodController;
