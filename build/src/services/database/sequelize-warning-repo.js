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
exports.warningInstanceToObj = exports.SequelizeWarningRepo = void 0;
const warning_1 = require("../../entities/warning");
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const sequelize_tank_repo_1 = require("./sequelize-tank-repo");
class SequelizeWarningRepo {
    async add(warning) {
        const newId = crypto.randomUUID();
        await models_1.Warnings.create({
            warningTankId: warning.tank.id,
            warningMsg: warning.msg,
            warningTemperature: warning.details.verification?.temperatureOutOfRange,
            warningOxygen: warning.details.verification?.oxygenOutOfRange,
            warningPh: warning.details.verification?.phOutOfRange,
            warningId: newId,
        });
        warning.id = newId;
        return newId;
    }
    async delete(id) {
        await models_1.Warnings.destroy({ where: { warningId: id } });
    }
    async list() {
        const allWarningInstances = await models_1.Warnings.findAll();
        const allWarningObjects = [];
        for (let i = 0; i < allWarningInstances.length; i++) {
            allWarningObjects.push(await warningInstanceToObj(allWarningInstances[i]));
        }
        return allWarningObjects;
    }
}
exports.SequelizeWarningRepo = SequelizeWarningRepo;
async function warningInstanceToObj(instance) {
    return new warning_1.Warning(await (0, sequelize_tank_repo_1.tankInstanceToObj)(await models_1.Tanks.findOne({
        where: { tankId: instance.dataValues.warningTankId },
    })), instance.dataValues.warningMsg, {
        verification: {
            oxygenOutOfRange: instance.dataValues.warningOxygen,
            temperatureOutOfRange: instance.dataValues.warningTemperature,
            phOutOfRange: instance.dataValues.warningPh,
        },
    }, instance.dataValues.warningId);
}
exports.warningInstanceToObj = warningInstanceToObj;
