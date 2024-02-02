"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSpecieController = void 0;
const app_factory_1 = __importDefault(require("../../app-factory"));
async function registerSpecieController(req, res) {
    try {
        const id = await app_factory_1.default.registerSpecie(req.body);
        res.status(201).json({ id });
    }
    catch (e) {
        res.status(500).json({
            message: "Could not register fish specie.",
        });
        return;
    }
}
exports.registerSpecieController = registerSpecieController;
