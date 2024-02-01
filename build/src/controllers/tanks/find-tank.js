"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTankByController = void 0;
const tank_not_found_error_1 = require("../../errors/tank-not-found-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function findTankByController(req, res) {
    try {
        let retrieved;
        if (req.body.by == "id") {
            retrieved = await app_factory_1.default.findTank(req.body.value);
        }
        else {
            retrieved = await app_factory_1.default.findTanksBy(req.body.by, req.body.value);
        }
        res.status(200).json({ retrieved });
    }
    catch (e) {
        if (e instanceof tank_not_found_error_1.TankNotFoundError) {
            res.status(400).json({
                message: e.message,
            });
            return;
        }
        res.status(500).json({
            message: `Could not find tank.`,
        });
    }
}
exports.findTankByController = findTankByController;
