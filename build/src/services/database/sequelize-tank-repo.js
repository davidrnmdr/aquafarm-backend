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
exports.tankInstanceToObj = exports.SequelizeTankRepo = void 0;
const tank_1 = require("../../entities/tank");
const models_1 = require("./models");
const sequelize_fishSpecie_repo_1 = require("./sequelize-fishSpecie-repo");
const crypto = __importStar(require("crypto"));
class SequelizeTankRepo {
    async add(tank) {
        const newId = crypto.randomUUID();
        await models_1.Tanks.create({
            tankSpecieId: tank.fishSpecie.id,
            tankType: tank.type,
            tankLocation: tank.location,
            tankStatus: tank.status,
            tankCapacity: tank.capacity,
            tankId: newId,
        });
        tank.id = newId;
        return newId;
    }
    async find(id) {
        const tank = await models_1.Tanks.findOne({ where: { tankId: id } });
        return tank ? await tankInstanceToObj(tank) : undefined;
    }
    async findBy(attribute, attributeValue) {
        let tankInstances;
        const tankObjects = [];
        switch (attribute) {
            case "type":
                tankInstances = await models_1.Tanks.findAll({
                    where: { tankType: attributeValue },
                });
                break;
            case "capacity":
                tankInstances = await models_1.Tanks.findAll({
                    where: { tankCapacity: attributeValue },
                });
                break;
            case "location":
                tankInstances = await models_1.Tanks.findAll({
                    where: { tankLocation: attributeValue },
                });
                break;
            case "status":
                tankInstances = await models_1.Tanks.findAll({
                    where: { tankStatus: attributeValue },
                });
                break;
        }
        for (let i = 0; i < tankInstances.length; i++) {
            tankObjects.push(await tankInstanceToObj(tankInstances[i]));
        }
        return tankObjects;
    }
    async updateStatus(id, status) {
        await models_1.Tanks.update({ tankStatus: status }, { where: { tankId: id } });
    }
    async delete(id) {
        await models_1.Tanks.destroy({ where: { tankId: id } });
    }
    async list() {
        const allTankInstances = await models_1.Tanks.findAll();
        const allTankObjects = [];
        for (let i = 0; i < allTankInstances.length; i++) {
            allTankObjects.push(await tankInstanceToObj(allTankInstances[i]));
        }
        return allTankObjects;
    }
}
exports.SequelizeTankRepo = SequelizeTankRepo;
async function tankInstanceToObj(instance) {
    return new tank_1.Tank((0, sequelize_fishSpecie_repo_1.specieInstanceToObj)(await models_1.FishSpecies.findOne({
        where: { specieId: instance.dataValues.tankSpecieId },
    })), instance.dataValues.tankType, instance.dataValues.tankLocation, instance.dataValues.tankStatus, instance.dataValues.tankCapacity, instance.dataValues.tankId);
}
exports.tankInstanceToObj = tankInstanceToObj;
