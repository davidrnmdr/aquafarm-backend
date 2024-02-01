"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTreatmentByIdController = void 0;
const treatment_not_found_error_1 = require("../../errors/treatment-not-found-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function findTreatmentByIdController(req, res) {
    try {
        const retrievedTreatment = await app_factory_1.default.findTreatment(req.body.id);
        res.status(200).json({ retrievedTreatment });
    }
    catch (e) {
        if (e instanceof treatment_not_found_error_1.TreatmentNotFoundError) {
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
exports.findTreatmentByIdController = findTreatmentByIdController;
