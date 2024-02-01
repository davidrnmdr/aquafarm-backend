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
exports.foodInstanceToObj = exports.SequelizeFoodRepo = void 0;
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const food_1 = require("../../entities/food");
const sequelize_businessPartner_repo_1 = require("./sequelize-businessPartner-repo");
class SequelizeFoodRepo {
    async add(food) {
        const newId = crypto.randomUUID();
        await models_1.Foods.create({
            foodType: food.type,
            foodQuantity: food.quantity,
            foodCost: food.cost,
            foodExpirationDate: food.expirationDate,
            foodSellerId: food.seller.id,
            foodId: newId,
        });
        food.id = newId;
        return newId;
    }
    async find(id) {
        const food = await models_1.Foods.findOne({ where: { foodId: id } });
        return food ? await foodInstanceToObj(food) : undefined;
    }
    async updateStorage(id, quantity) {
        await models_1.Foods.update({ foodQuantity: quantity }, { where: { foodId: id } });
    }
    async delete(id) {
        await models_1.Foods.destroy({ where: { foodId: id } });
    }
    async list() {
        const allFoodInstances = await models_1.Foods.findAll();
        const allFoodObjects = [];
        for (let i = 0; i < allFoodInstances.length; i++) {
            allFoodObjects.push(await foodInstanceToObj(allFoodInstances[i]));
        }
        return allFoodObjects;
    }
}
exports.SequelizeFoodRepo = SequelizeFoodRepo;
async function foodInstanceToObj(instance) {
    return new food_1.Food(instance.dataValues.foodType, instance.dataValues.foodQuantity, instance.dataValues.foodCost, instance.dataValues.foodExpirationDate, (0, sequelize_businessPartner_repo_1.partnerInstanceToObj)(await models_1.BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.foodSellerId },
    })), instance.dataValues.foodId);
}
exports.foodInstanceToObj = foodInstanceToObj;
