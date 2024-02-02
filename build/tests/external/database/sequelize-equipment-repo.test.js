"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equipment_1 = require("../../../src/entities/equipment");
const sequelize_equipment_repo_1 = require("../../../src/services/database/sequelize-equipment-repo");
const models_1 = require("../../../src/services/database/models");
const businessPartner_1 = require("../../../src/entities/businessPartner");
const sequelize_businessPartner_repo_1 = require("../../../src/services/database/sequelize-businessPartner-repo");
describe("sequelize equipments repository", () => {
    const sequelizeEquipmentRepo = new sequelize_equipment_repo_1.SequelizeEquipmentRepo();
    const sequelizePartnerRepo = new sequelize_businessPartner_repo_1.SequelizeBusinessPartnerRepo();
    let newId;
    let newId2;
    let sellerId;
    const seller = new businessPartner_1.BusinessPartner(123, "company@mail.com", "company llc", "street 2, 987");
    beforeEach(async () => {
        await models_1.BusinessPartners.sync({ force: true });
        await models_1.Equipments.sync({ force: true });
        sellerId = await sequelizePartnerRepo.add(seller);
        newId = await sequelizeEquipmentRepo.add(new equipment_1.Equipment("oxygen bomb", "new", "room 4", seller, 0, 1200, 2));
        newId2 = await sequelizeEquipmentRepo.add(new equipment_1.Equipment("computer", "new", "office 2", seller, 0, 400, 1));
    }, 20000);
    afterAll(async () => {
        await models_1.BusinessPartners.sync({ force: true });
        await models_1.Equipments.sync({ force: true });
    }, 20000);
    it("adds an equipment to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("finds an equipment by id", async () => {
        const retrievedEquipment = await sequelizeEquipmentRepo.find(newId);
        const shouldBeUndefined = await sequelizeEquipmentRepo.find("123445");
        expect(retrievedEquipment).toBeInstanceOf(equipment_1.Equipment);
        expect(retrievedEquipment?.id).toEqual(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("updades the status of a given equipment", async () => {
        const newStatus = "broken";
        await sequelizeEquipmentRepo.updateStatus(newId, newStatus);
        const retrievedEquipment = await sequelizeEquipmentRepo.find(newId);
        expect(retrievedEquipment?.status).toEqual(newStatus);
    });
    it("updates the maintenance cost of a given equipment", async () => {
        const newCost = 299.2;
        await sequelizeEquipmentRepo.updateMaintenanceCost(newId, newCost);
        let retrievedEquipment = await sequelizeEquipmentRepo.find(newId);
        expect(retrievedEquipment?.totalMaintenanceCost).toEqual(newCost);
        const newCost2 = 100;
        await sequelizeEquipmentRepo.updateMaintenanceCost(newId, newCost2);
        retrievedEquipment = await sequelizeEquipmentRepo.find(newId);
        expect(retrievedEquipment?.totalMaintenanceCost).toEqual(newCost + newCost2);
    });
    it("deletes a given equipment", async () => {
        await sequelizeEquipmentRepo.delete(newId);
        const shouldBeUndefined = await sequelizeEquipmentRepo.find(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("lists all equipments", async () => {
        const equipmentList = await sequelizeEquipmentRepo.list();
        expect(equipmentList[0]).toBeInstanceOf(equipment_1.Equipment);
        expect(equipmentList[0].id).toEqual(newId);
        expect(equipmentList[1].id).toEqual(newId2);
    });
});
