"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPurchasesController = void 0;
const invalid_input_error_1 = require("../../errors/invalid-input-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function filterPurchasesController(req, res) {
    try {
        const retrievedPurchases = await app_factory_1.default.filterPurchases({
            value: req.body.valueMin
                ? { min: req.body.valueMin, max: req.body.valueMax }
                : undefined,
            partner: req.body.partnerEin ? { ein: req.body.partnerEin } : undefined,
            date: req.body.dateMin
                ? { min: new Date(req.body.dateMin), max: new Date(req.body.dateMax) }
                : undefined,
            food: req.body.food,
            treatment: req.body.treatment,
            equipment: req.body.equipment,
        });
        res.status(200).json({ retrievedPurchases });
    }
    catch (e) {
        if (isKnownError(e)) {
            res.status(400).json({
                message: e.message,
            });
            return;
        }
        res.status(500).json({
            message: `Could not filter purchases.`,
        });
    }
}
exports.filterPurchasesController = filterPurchasesController;
function isKnownError(e) {
    return e instanceof invalid_input_error_1.InvalidInputError;
}
