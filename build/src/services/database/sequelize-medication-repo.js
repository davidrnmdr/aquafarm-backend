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
exports.SequelizeMedicationRepo = void 0;
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const models_2 = require("./models");
const models_3 = require("./models");
const models_4 = require("./models");
const medication_1 = require("../../entities/medication");
const sequelize_tank_repo_1 = require("./sequelize-tank-repo");
const sequelize_employee_repo_1 = require("./sequelize-employee-repo");
const sequelize_treatment_repo_1 = require("./sequelize-treatment-repo");
const sequelize_1 = require("sequelize");
class SequelizeMedicationRepo {
    async add(medication) {
        const newId = crypto.randomUUID();
        await models_4.Medications.create({
            medicationEmployeeId: medication.employee.id,
            medicationTankId: medication.tank.id,
            medicationTreatmentId: medication.treatment.id,
            medicationQuantity: medication.quantity,
            medicationDate: new Date(),
            medicationId: newId,
        });
        medication.id = newId;
        return newId;
    }
    async find(id) {
        const medication = await models_4.Medications.findOne({
            where: { medicationId: id },
        });
        return medication ? await medicationInstanceToObj(medication) : undefined;
    }
    async findByEmployee(attribute, value) {
        let employeeIds = [];
        const medicationObjects = [];
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
        const medicationInstances = await models_4.Medications.findAll({
            where: {
                medicationEmployeeId: {
                    [sequelize_1.Op.in]: employeeIds,
                },
            },
        });
        for (let i = 0; i < medicationInstances.length; i++) {
            medicationObjects.push(await medicationInstanceToObj(medicationInstances[i]));
        }
        return medicationObjects;
    }
    async delete(id) {
        await models_4.Medications.destroy({ where: { medicationId: id } });
    }
    async list() {
        const allMedicationInstances = await models_4.Medications.findAll();
        const allMedicationObjects = [];
        for (let i = 0; i < allMedicationInstances.length; i++) {
            allMedicationObjects.push(await medicationInstanceToObj(allMedicationInstances[i]));
        }
        return allMedicationObjects;
    }
}
exports.SequelizeMedicationRepo = SequelizeMedicationRepo;
async function medicationInstanceToObj(instance) {
    return new medication_1.Medication((0, sequelize_employee_repo_1.employeeInstanceToObj)(await models_1.Employees.findOne({
        where: { employeeId: instance.dataValues.medicationEmployeeId },
    })), await (0, sequelize_tank_repo_1.tankInstanceToObj)(await models_2.Tanks.findOne({
        where: { tankId: instance.dataValues.medicationTankId },
    })), await (0, sequelize_treatment_repo_1.treatmentInstanceToObj)(await models_3.Treatments.findOne({
        where: { treatmentId: instance.dataValues.medicationTreatmentId },
    })), instance.dataValues.medicationQuantity, instance.dataValues.medicationDate, instance.dataValues.medicationId);
}
