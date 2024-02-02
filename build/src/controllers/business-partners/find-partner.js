"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPartnerByEinController = void 0;
const partner_not_found_error_1 = require("../../errors/partner-not-found-error");
const app_factory_1 = __importDefault(require("../../app-factory"));
async function findPartnerByEinController(req, res) {
    try {
        const retrievedPartner = await app_factory_1.default.findBusinessPartner(req.body.ein);
        res.status(200).json({ retrievedPartner });
    }
    catch (e) {
        if (e instanceof partner_not_found_error_1.PartnerNotFoundError) {
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
exports.findPartnerByEinController = findPartnerByEinController;
