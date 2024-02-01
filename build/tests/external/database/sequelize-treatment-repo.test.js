"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const treatment_1 = require("../../../src/entities/treatment");
const sequelize_treatment_repo_1 = require("../../../src/services/database/sequelize-treatment-repo");
const models_1 = require("../../../src/services/database/models");
const businessPartner_1 = require("../../../src/entities/businessPartner");
const sequelize_businessPartner_repo_1 = require("../../../src/services/database/sequelize-businessPartner-repo");
describe("sequelize foods repository", () => {
    const sequelizeTreatmentRepo = new sequelize_treatment_repo_1.SequelizeTreatmentRepo();
    const sequelizePartnerRepo = new sequelize_businessPartner_repo_1.SequelizeBusinessPartnerRepo();
    let newId;
    let newId2;
    let sellerId;
    const seller = new businessPartner_1.BusinessPartner(123, "company@mail.com", "company llc", "street 2, 987");
    beforeEach(async () => {
        await models_1.Treatments.sync({ force: true });
        await models_1.BusinessPartners.sync({ force: true });
        sellerId = await sequelizePartnerRepo.add(seller);
        newId = await sequelizeTreatmentRepo.add(new treatment_1.Treatment("skin med", 20, 500.9, new Date("2025-10-10"), seller));
        newId2 = await sequelizeTreatmentRepo.add(new treatment_1.Treatment("skin med 2", 10, 100, new Date("2025-10-10"), seller));
    }, 20000);
    afterAll(async () => {
        await models_1.Treatments.sync({ force: true });
        await models_1.BusinessPartners.sync({ force: true });
    }, 20000);
    it("adds a treatment to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("finds a treatment by id", async () => {
        const retrievedTreatment = await sequelizeTreatmentRepo.find(newId);
        const shouldBeUndefined = await sequelizeTreatmentRepo.find("12345");
        expect(retrievedTreatment).toBeInstanceOf(treatment_1.Treatment);
        expect(retrievedTreatment?.id).toEqual(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("updates the storage of a given treatment", async () => {
        const newStorage = 5;
        await sequelizeTreatmentRepo.updateStorage(newId, newStorage);
        const retrievedFood = await sequelizeTreatmentRepo.find(newId);
        expect(retrievedFood?.quantity).toEqual(newStorage);
    });
    it("deletes a given treatment", async () => {
        await sequelizeTreatmentRepo.delete(newId);
        const shouldBeUndefined = await sequelizeTreatmentRepo.find(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("lists all foods", async () => {
        const foodList = await sequelizeTreatmentRepo.list();
        expect(foodList[0]).toBeInstanceOf(treatment_1.Treatment);
        expect(foodList[0].id).toEqual(newId);
        expect(foodList[1].id).toEqual(newId2);
    });
});
