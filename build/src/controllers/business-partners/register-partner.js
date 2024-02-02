"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPartnerController = void 0;
const duplicate_partner_error_1 = require("../../errors/duplicate-partner-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function registerPartnerController(req, res) {
    try {
        const id = await app_factory_1.default.registerBusinessPartner(req.body);
        res.status(201).json({ id });
    }
    catch (e) {
        if (e instanceof duplicate_partner_error_1.DuplicatePartnerError) {
            res.status(400).json({
                message: e.message,
            });
            return;
        }
        res.status(500).json({
            message: `Could not register business partner.`,
        });
    }
}
exports.registerPartnerController = registerPartnerController;
