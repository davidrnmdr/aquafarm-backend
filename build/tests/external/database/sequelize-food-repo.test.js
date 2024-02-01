"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const food_1 = require("../../../src/entities/food");
const sequelize_food_repo_1 = require("../../../src/services/database/sequelize-food-repo");
const models_1 = require("../../../src/services/database/models");
const businessPartner_1 = require("../../../src/entities/businessPartner");
const sequelize_businessPartner_repo_1 = require("../../../src/services/database/sequelize-businessPartner-repo");
describe("sequelize foods repository", () => {
    const sequelizeFoodRepo = new sequelize_food_repo_1.SequelizeFoodRepo();
    const sequelizePartnerRepo = new sequelize_businessPartner_repo_1.SequelizeBusinessPartnerRepo();
    let newId;
    let newId2;
    let sellerId;
    const seller = new businessPartner_1.BusinessPartner(123, "company@mail.com", "company llc", "street 2, 987");
    beforeEach(async () => {
        await models_1.Foods.sync({ force: true });
        await models_1.BusinessPartners.sync({ force: true });
        sellerId = await sequelizePartnerRepo.add(seller);
        newId = await sequelizeFoodRepo.add(new food_1.Food("flakes", 20, 500.9, new Date("2025-10-10"), seller));
        newId2 = await sequelizeFoodRepo.add(new food_1.Food("pallets", 10, 100, new Date("2025-10-10"), seller));
    }, 20000);
    afterAll(async () => {
        await models_1.Foods.sync({ force: true });
        await models_1.BusinessPartners.sync({ force: true });
    }, 20000);
    it("adds a food to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("finds a food by id", async () => {
        const retrievedFood = await sequelizeFoodRepo.find(newId);
        const shouldBeUndefined = await sequelizeFoodRepo.find("12345");
        expect(retrievedFood).toBeInstanceOf(food_1.Food);
        expect(retrievedFood?.id).toEqual(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("updates the storage of a given food", async () => {
        const newStorage = 5;
        await sequelizeFoodRepo.updateStorage(newId, newStorage);
        const retrievedFood = await sequelizeFoodRepo.find(newId);
        expect(retrievedFood?.quantity).toEqual(newStorage);
    });
    it("deletes a given food", async () => {
        await sequelizeFoodRepo.delete(newId);
        const shouldBeUndefined = await sequelizeFoodRepo.find(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("lists all foods", async () => {
        const foodList = await sequelizeFoodRepo.list();
        expect(foodList[0]).toBeInstanceOf(food_1.Food);
        expect(foodList[0].id).toEqual(newId);
        expect(foodList[1].id).toEqual(newId2);
    });
});
