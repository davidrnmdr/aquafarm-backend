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
exports.equipmentInstanceToObj = exports.SequelizeEquipmentRepo = void 0;
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const equipment_1 = require("../../entities/equipment");
const sequelize_businessPartner_repo_1 = require("./sequelize-businessPartner-repo");
class SequelizeEquipmentRepo {
    async add(equipment) {
        const newId = crypto.randomUUID();
        await models_1.Equipments.create({
            equipmentType: equipment.type,
            equipmentStatus: equipment.status,
            equipmentLocation: equipment.location,
            equipmentSellerId: equipment.seller.id,
            equipmentMaintenanceCost: equipment.totalMaintenanceCost,
            equipmentCost: equipment.cost,
            equipmentQuantity: equipment.quantity,
            equipmentId: newId,
        });
        equipment.id = newId;
        return newId;
    }
    async find(id) {
        const equipment = await models_1.Equipments.findOne({ where: { equipmentId: id } });
        return equipment ? equipmentInstanceToObj(equipment) : undefined;
    }
    async updateStatus(id, status) {
        await models_1.Equipments.update({ equipmentStatus: status }, { where: { equipmentId: id } });
    }
    async updateMaintenanceCost(id, cost) {
        await models_1.Equipments.increment({ equipmentMaintenanceCost: cost }, { where: { equipmentId: id } });
    }
    async delete(id) {
        await models_1.Equipments.destroy({ where: { equipmentId: id } });
    }
    async list() {
        const allEquipmentInstances = await models_1.Equipments.findAll();
        const allEquipmentObjects = [];
        for (let i = 0; i < allEquipmentInstances.length; i++) {
            allEquipmentObjects.push(await equipmentInstanceToObj(allEquipmentInstances[i]));
        }
        return allEquipmentObjects;
    }
}
exports.SequelizeEquipmentRepo = SequelizeEquipmentRepo;
async function equipmentInstanceToObj(instance) {
    return new equipment_1.Equipment(instance.dataValues.equipmentType, instance.dataValues.equipmentStatus, instance.dataValues.equipmentLocation, (0, sequelize_businessPartner_repo_1.partnerInstanceToObj)(await models_1.BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.equipmentSellerId },
    })), instance.dataValues.equipmentMaintenanceCost, instance.dataValues.equipmentCost, instance.dataValues.equipmentQuantity, instance.dataValues.equipmentId);
}
exports.equipmentInstanceToObj = equipmentInstanceToObj;
