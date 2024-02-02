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
exports.SequelizeMaintenanceRepo = void 0;
const sequelize_1 = require("sequelize");
const maintenance_1 = require("../../entities/maintenance");
const models_1 = require("./models");
const sequelize_employee_repo_1 = require("./sequelize-employee-repo");
const sequelize_equipment_repo_1 = require("./sequelize-equipment-repo");
const crypto = __importStar(require("crypto"));
class SequelizeMaintenanceRepo {
    async add(maintenance) {
        const newId = crypto.randomUUID();
        await models_1.Maintenances.create({
            maintenanceEmployeeId: maintenance.employee.id,
            maintenanceEquipmentId: maintenance.equipment.id,
            maintenanceDate: maintenance.date,
            maintenanceCost: maintenance.cost,
            maintenanceId: newId,
        });
        maintenance.id = newId;
        return newId;
    }
    async find(id) {
        const maintenance = await models_1.Maintenances.findOne({
            where: { maintenanceId: id },
        });
        return maintenance
            ? await maintenanceInstanceToObj(maintenance)
            : undefined;
    }
    async findByEmployee(attribute, value) {
        let employeeIds = [];
        const maintenanceObjects = [];
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
        const maintenanceInstances = await models_1.Maintenances.findAll({
            where: {
                maintenanceEmployeeId: {
                    [sequelize_1.Op.in]: employeeIds,
                },
            },
        });
        for (let i = 0; i < maintenanceInstances.length; i++) {
            maintenanceObjects.push(await maintenanceInstanceToObj(maintenanceInstances[i]));
        }
        return maintenanceObjects;
    }
    async delete(id) {
        await models_1.Maintenances.destroy({ where: { maintenanceId: id } });
    }
    async list() {
        const allMaintenanceInstances = await models_1.Maintenances.findAll();
        const allMaintenanceObjects = [];
        for (let i = 0; i < allMaintenanceInstances.length; i++) {
            allMaintenanceObjects.push(await maintenanceInstanceToObj(allMaintenanceInstances[i]));
        }
        return allMaintenanceObjects;
    }
}
exports.SequelizeMaintenanceRepo = SequelizeMaintenanceRepo;
async function maintenanceInstanceToObj(instance) {
    return new maintenance_1.Maintenance(await (0, sequelize_equipment_repo_1.equipmentInstanceToObj)(await models_1.Equipments.findOne({
        where: { equipmentId: instance.dataValues.maintenanceEquipmentId },
    })), (0, sequelize_employee_repo_1.employeeInstanceToObj)(await models_1.Employees.findOne({
        where: { employeeId: instance.dataValues.maintenanceEmployeeId },
    })), instance.dataValues.maintenanceDate, instance.dataValues.maintenanceCost, instance.dataValues.maintenanceId);
}
