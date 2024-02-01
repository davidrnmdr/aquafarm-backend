"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTreatmentController = void 0;
const invalid_input_error_1 = require("../../errors/invalid-input-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function registerTreatmentController(req, res) {
    try {
        const id = await app_factory_1.default.registerTreatment(req.body);
        res.status(201).json({ id });
    }
    catch (e) {
        if (e instanceof invalid_input_error_1.InvalidInputError) {
            res.status(400).json({
                message: e.message,
            });
            return;
        }
        res.status(500).json({
            message: `Could not register treatment.`,
        });
    }
}
exports.registerTreatmentController = registerTreatmentController;
