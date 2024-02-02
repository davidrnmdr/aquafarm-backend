"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerInstanceToObj = exports.SequelizeBusinessPartnerRepo = void 0;
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const businessPartner_1 = require("../../entities/businessPartner");
class SequelizeBusinessPartnerRepo {
    async add(businessPartner) {
        const newId = crypto.randomUUID();
        await models_1.BusinessPartners.create({
            partnerEin: businessPartner.ein,
            partnerEmail: businessPartner.email,
            partnerName: businessPartner.name,
            partnerAddress: businessPartner.address,
            partnerId: newId,
        });
        businessPartner.id = newId;
        return newId;
    }
    async find(ein) {
        const partner = await models_1.BusinessPartners.findOne({
            where: { partnerEin: `${ein}` },
        });
        return partner ? partnerInstanceToObj(partner) : undefined;
    }
    async updateEmail(id, email) {
        await models_1.BusinessPartners.update({ partnerEmail: email }, { where: { partnerId: id } });
    }
    async delete(id) {
        await models_1.BusinessPartners.destroy({ where: { partnerId: id } });
    }
    async list() {
        return (await models_1.BusinessPartners.findAll()).map(partnerInstanceToObj);
    }
}
exports.SequelizeBusinessPartnerRepo = SequelizeBusinessPartnerRepo;
function partnerInstanceToObj(instance) {
    return new businessPartner_1.BusinessPartner(Number(instance.dataValues.partnerEin), instance.dataValues.partnerEmail, instance.dataValues.partnerName, instance.dataValues.partnerAddress, instance.dataValues.partnerId);
}
exports.partnerInstanceToObj = partnerInstanceToObj;
