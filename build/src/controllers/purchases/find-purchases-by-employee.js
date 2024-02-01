"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPurchasesByEmployeeController = void 0;
const app_factory_1 = __importDefault(require("../../app-factory"));
const unable_to_find_error_1 = require("../../errors/unable-to-find-error");
async function findPurchasesByEmployeeController(req, res) {
    try {
        const retrievedPurchases = await app_factory_1.default.findPurchasesByEmployee(req.body.attribute, req.body.value);
        res.status(200).json({ retrievedPurchases });
    }
    catch (e) {
        if (e instanceof unable_to_find_error_1.UnableToFindError) {
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
exports.findPurchasesByEmployeeController = findPurchasesByEmployeeController;
