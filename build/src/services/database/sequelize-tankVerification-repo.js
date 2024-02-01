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
exports.SequelizeTankVerificationRepo = void 0;
const tankVerification_1 = require("../../entities/tankVerification");
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const sequelize_tank_repo_1 = require("./sequelize-tank-repo");
const sequelize_employee_repo_1 = require("./sequelize-employee-repo");
const sequelize_1 = require("sequelize");
class SequelizeTankVerificationRepo {
    async add(tankVerification) {
        const newId = crypto.randomUUID();
        await models_1.Verifications.create({
            verificationEmployeeId: tankVerification.employee.id,
            verificationTankId: tankVerification.tank.id,
            verificationTemperature: tankVerification.temperature,
            verificationOxygen: tankVerification.oxygen,
            verificationPh: tankVerification.ph,
            verificationDate: tankVerification.date,
            verificationId: newId,
        });
        tankVerification.id = newId;
        return newId;
    }
    async find(id) {
        const verification = await models_1.Verifications.findOne({
            where: { verificationId: id },
        });
        return verification
            ? await verificationInstanceToObj(verification)
            : undefined;
    }
    async findByEmployee(attribute, value) {
        let employeeIds = [];
        const verificationObjects = [];
        switch (attribute) {
            case "email":
                employeeIds = (await models_1.Employees.findAll({ where: { employeeEmail: value } }))
                    .map(sequelize_employee_repo_1.employeeInstanceToObj)
                    .map((employee) => employee.id);
                break;
            case "name":
                employeeIds = (await models_1.Employees.findAll({ where: { employeeName: value } }))
                    .map(sequelize_employee_repo_1.employeeInstanceToObj)
                    .map((employee) => employee.id);
                break;
            case "role":
                employeeIds = (await models_1.Employees.findAll({ where: { employeeRole: value } }))
                    .map(sequelize_employee_repo_1.employeeInstanceToObj)
                    .map((employee) => employee.id);
                break;
        }
        const verificationInstances = await models_1.Verifications.findAll({
            where: {
                verificationEmployeeId: {
                    [sequelize_1.Op.in]: employeeIds,
                },
            },
        });
        for (let i = 0; i < verificationInstances.length; i++) {
            verificationObjects.push(await verificationInstanceToObj(verificationInstances[i]));
        }
        return verificationObjects;
    }
    async delete(id) {
        await models_1.Verifications.destroy({ where: { verificationId: id } });
    }
    async list() {
        const allVerificationInstances = await models_1.Verifications.findAll();
        const allVerificationObjects = [];
        for (let i = 0; i < allVerificationInstances.length; i++) {
            allVerificationObjects.push(await verificationInstanceToObj(allVerificationInstances[i]));
        }
        return allVerificationObjects;
    }
}
exports.SequelizeTankVerificationRepo = SequelizeTankVerificationRepo;
async function verificationInstanceToObj(instance) {
    return new tankVerification_1.TankVerification(await (0, sequelize_tank_repo_1.tankInstanceToObj)(await models_1.Tanks.findOne({
        where: { tankId: instance.dataValues.verificationTankId },
    })), (0, sequelize_employee_repo_1.employeeInstanceToObj)(await models_1.Employees.findOne({
        where: { employeeId: instance.dataValues.verificationEmployeeId },
    })), instance.dataValues.verificationTemperature, instance.dataValues.verificationOxygen, instance.dataValues.verificationPh, instance.dataValues.verificationDate, instance.dataValues.verificationId);
}
