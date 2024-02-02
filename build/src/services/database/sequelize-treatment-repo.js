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
exports.treatmentInstanceToObj = exports.SequelizeTreatmentRepo = void 0;
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const treatment_1 = require("../../entities/treatment");
const sequelize_businessPartner_repo_1 = require("./sequelize-businessPartner-repo");
class SequelizeTreatmentRepo {
    async add(treatment) {
        const newId = crypto.randomUUID();
        await models_1.Treatments.create({
            treatmentName: treatment.name,
            treatmentQuantity: treatment.quantity,
            treatmentCost: treatment.cost,
            treatmentExpirationDate: treatment.expirationDate,
            treatmentSellerId: treatment.seller.id,
            treatmentId: newId,
        });
        treatment.id = newId;
        return newId;
    }
    async find(id) {
        const treatment = await models_1.Treatments.findOne({ where: { treatmentId: id } });
        return treatment ? treatmentInstanceToObj(treatment) : undefined;
    }
    async updateStorage(id, quantity) {
        await models_1.Treatments.update({ treatmentQuantity: quantity }, { where: { treatmentId: id } });
    }
    async delete(id) {
        await models_1.Treatments.destroy({ where: { treatmentId: id } });
    }
    async list() {
        const allTreatmentInstances = await models_1.Treatments.findAll();
        const allTreatmentObjects = [];
        for (let i = 0; i < allTreatmentInstances.length; i++) {
            allTreatmentObjects.push(await treatmentInstanceToObj(allTreatmentInstances[i]));
        }
        return allTreatmentObjects;
    }
}
exports.SequelizeTreatmentRepo = SequelizeTreatmentRepo;
async function treatmentInstanceToObj(instance) {
    return new treatment_1.Treatment(instance.dataValues.treatmentName, instance.dataValues.treatmentQuantity, instance.dataValues.treatmentCost, instance.dataValues.treatmentExpirationDate, (0, sequelize_businessPartner_repo_1.partnerInstanceToObj)(await models_1.BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.treatmentSellerId },
    })), instance.dataValues.treatmentId);
}
exports.treatmentInstanceToObj = treatmentInstanceToObj;
