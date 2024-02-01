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
exports.SequelizeFeedingRepo = void 0;
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const models_2 = require("./models");
const models_3 = require("./models");
const models_4 = require("./models");
const feeding_1 = require("../../entities/feeding");
const sequelize_tank_repo_1 = require("./sequelize-tank-repo");
const sequelize_employee_repo_1 = require("./sequelize-employee-repo");
const sequelize_food_repo_1 = require("./sequelize-food-repo");
const sequelize_1 = require("sequelize");
class SequelizeFeedingRepo {
    async add(feeding) {
        const newId = crypto.randomUUID();
        await models_4.Feedings.create({
            feedingEmployeeId: feeding.employee.id,
            feedingTankId: feeding.tank.id,
            feedingFoodId: feeding.food.id,
            feedingQuantity: feeding.quantity,
            feedingDate: new Date(),
            feedingId: newId,
        });
        feeding.id = newId;
        return newId;
    }
    async find(id) {
        const feeding = await models_4.Feedings.findOne({ where: { feedingId: id } });
        return feeding ? await feedingInstanceToObj(feeding) : undefined;
    }
    async findByEmployee(attribute, value) {
        let employeeIds = [];
        const feedingObjects = [];
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
        const feedingInstances = await models_4.Feedings.findAll({
            where: {
                feedingEmployeeId: {
                    [sequelize_1.Op.in]: employeeIds,
                },
            },
        });
        for (let i = 0; i < feedingInstances.length; i++) {
            feedingObjects.push(await feedingInstanceToObj(feedingInstances[i]));
        }
        return feedingObjects;
    }
    async delete(id) {
        await models_4.Feedings.destroy({ where: { feedingId: id } });
    }
    async list() {
        const allFeedingInstances = await models_4.Feedings.findAll();
        const allFeedingObjects = [];
        for (let i = 0; i < allFeedingInstances.length; i++) {
            allFeedingObjects.push(await feedingInstanceToObj(allFeedingInstances[i]));
        }
        return allFeedingObjects;
    }
}
exports.SequelizeFeedingRepo = SequelizeFeedingRepo;
async function feedingInstanceToObj(instance) {
    return new feeding_1.Feeding((0, sequelize_employee_repo_1.employeeInstanceToObj)(await models_1.Employees.findOne({
        where: { employeeId: instance.dataValues.feedingEmployeeId },
    })), await (0, sequelize_tank_repo_1.tankInstanceToObj)(await models_2.Tanks.findOne({
        where: { tankId: instance.dataValues.feedingTankId },
    })), await (0, sequelize_food_repo_1.foodInstanceToObj)(await models_3.Foods.findOne({
        where: { foodId: instance.dataValues.feedingFoodId },
    })), instance.dataValues.feedingQuantity, instance.dataValues.feedingDate, instance.dataValues.feedingId);
}
