"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEquipmentByIdController = void 0;
const equipment_not_found_error_1 = require("../../errors/equipment-not-found-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function findEquipmentByIdController(req, res) {
    try {
        const retrievedEquipment = await app_factory_1.default.findEquipment(req.body.id);
        res.status(200).json({ retrievedEquipment });
    }
    catch (e) {
        if (e instanceof equipment_not_found_error_1.EquipmentNotFoundError) {
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
exports.findEquipmentByIdController = findEquipmentByIdController;
