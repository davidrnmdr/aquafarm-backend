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
exports.SequelizeTransactionRepo = void 0;
const purchase_1 = require("../../entities/purchase");
const sale_1 = require("../../entities/sale");
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const sequelize_businessPartner_repo_1 = require("./sequelize-businessPartner-repo");
const sequelize_employee_repo_1 = require("./sequelize-employee-repo");
const sequelize_food_repo_1 = require("./sequelize-food-repo");
const sequelize_equipment_repo_1 = require("./sequelize-equipment-repo");
const sequelize_treatment_repo_1 = require("./sequelize-treatment-repo");
const sequelize_1 = require("sequelize");
class SequelizeTransactionRepo {
    async add(transaction) {
        const transactionType = transaction instanceof sale_1.Sale ? "sale" : "purchase";
        const newId = crypto.randomUUID();
        if (transaction instanceof sale_1.Sale) {
            await models_1.Transactions.create({
                transactionType: transactionType.toLowerCase(),
                transactionValue: transaction.value,
                transactionPartnerId: transaction.partner.id,
                transactionEmployeeId: transaction.employee.id,
                transactionSaleQuantity: transaction.quantity,
                transactionDate: transaction.date,
                transactionId: newId,
            });
        }
        else {
            await models_1.Transactions.create({
                transactionType: transactionType.toLowerCase(),
                transactionValue: transaction.value,
                transactionPartnerId: transaction.partner.id,
                transactionEmployeeId: transaction.employee.id,
                transactionPurchaseFoodId: transaction.food?.id,
                transactionPurchaseTreatmentId: transaction.treatment?.id,
                transactionPurchaseEquipmentId: transaction.equipment?.id,
                transactionDate: transaction.date,
                transactionId: newId,
            });
        }
        transaction.id = newId;
        return newId;
    }
    async find(type, id) {
        const transaction = await models_1.Transactions.findOne({
            where: { transactionId: id },
        });
        return transaction
            ? type === "sale"
                ? await saleInstanceToObj(transaction)
                : await purchaseInstanceToObj(transaction)
            : undefined;
    }
    async findByEmployee(type, attribute, value) {
        let employeeIds = [];
        const saleObjects = [];
        const purchaseObjects = [];
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
        const transactionInstances = await models_1.Transactions.findAll({
            where: {
                transactionEmployeeId: {
                    [sequelize_1.Op.in]: employeeIds,
                },
                transactionType: type,
            },
        });
        if (type === "sale") {
            for (let i = 0; i < transactionInstances.length; i++) {
                saleObjects.push(await saleInstanceToObj(transactionInstances[i]));
            }
            return saleObjects;
        }
        else {
            for (let i = 0; i < transactionInstances.length; i++) {
                purchaseObjects.push(await purchaseInstanceToObj(transactionInstances[i]));
            }
            return purchaseObjects;
        }
    }
    async list(type) {
        const allTransactionInstances = await models_1.Transactions.findAll({
            where: { transactionType: type },
        });
        const saleObjects = [];
        const purchaseObjects = [];
        if (type === "sale") {
            for (let i = 0; i < allTransactionInstances.length; i++) {
                saleObjects.push(await saleInstanceToObj(allTransactionInstances[i]));
            }
            return saleObjects;
        }
        else {
            for (let i = 0; i < allTransactionInstances.length; i++) {
                purchaseObjects.push(await purchaseInstanceToObj(allTransactionInstances[i]));
            }
            return purchaseObjects;
        }
    }
}
exports.SequelizeTransactionRepo = SequelizeTransactionRepo;
async function saleInstanceToObj(instance) {
    return new sale_1.Sale(instance.dataValues.transactionValue, (0, sequelize_businessPartner_repo_1.partnerInstanceToObj)(await models_1.BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.transactionPartnerId },
    })), instance.dataValues.transactionDate, instance.dataValues.transactionSaleQuantity, (0, sequelize_employee_repo_1.employeeInstanceToObj)(await models_1.Employees.findOne({
        where: { employeeId: instance.dataValues.transactionEmployeeId },
    })), instance.dataValues.transactionId);
}
async function purchaseInstanceToObj(instance) {
    return new purchase_1.Purchase(instance.dataValues.transactionValue, (0, sequelize_businessPartner_repo_1.partnerInstanceToObj)(await models_1.BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.transactionPartnerId },
    })), instance.dataValues.transactionDate, instance.dataValues.transactionPurchaseFoodId
        ? await (0, sequelize_food_repo_1.foodInstanceToObj)(await models_1.Foods.findOne({
            where: { foodId: instance.dataValues.transactionPurchaseFoodId },
        }))
        : null, instance.dataValues.transactionPurchaseTreatmentId
        ? await (0, sequelize_treatment_repo_1.treatmentInstanceToObj)(await models_1.Treatments.findOne({
            where: {
                treatmentId: instance.dataValues.transactionPurchaseTreatmentId,
            },
        }))
        : null, instance.dataValues.transactionPurchaseEquipmentId
        ? await (0, sequelize_equipment_repo_1.equipmentInstanceToObj)(await models_1.Equipments.findOne({
            where: {
                equipmentId: instance.dataValues.transactionPurchaseEquipmentId,
            },
        }))
        : null, (0, sequelize_employee_repo_1.employeeInstanceToObj)(await models_1.Employees.findOne({
        where: { employeeId: instance.dataValues.transactionEmployeeId },
    })), instance.dataValues.transactionId);
}
