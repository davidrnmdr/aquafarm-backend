"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_equipment_repo_1 = require("../../src/doubles/fake-equipment-repo");
const businessPartner_1 = require("../../src/entities/businessPartner");
const equipment_1 = require("../../src/entities/equipment");
let fakeEquipmentRepo;
describe("fake equipment repo", () => {
    beforeEach(() => {
        fakeEquipmentRepo = new fake_equipment_repo_1.FakeEquipmentRepo();
    });
    const seller = new businessPartner_1.BusinessPartner(7762, "company@mail.com", "company llc", "street 2, 877");
    it("adds an equipment to the repository", async () => {
        const equipmentToBeAdded = new equipment_1.Equipment("machine", "ok", "room 2", seller, 0, 9888.9, 1);
        const newId = await fakeEquipmentRepo.add(equipmentToBeAdded);
        expect(newId).toBeTruthy();
        expect(fakeEquipmentRepo.equipments[0].id).toEqual(newId);
    });
    it("finds an equipment by id", async () => {
        const equipmentToBeAdded = new equipment_1.Equipment("machine", "ok", "room 2", seller, 0, 9888.9, 1);
        const newId = await fakeEquipmentRepo.add(equipmentToBeAdded);
        const retrievedEquipment = await fakeEquipmentRepo.find(newId);
        expect(retrievedEquipment).toBeDefined();
        expect(retrievedEquipment?.id).toEqual(equipmentToBeAdded.id);
    });
    it("updates the status of a given equipment", async () => {
        const equipmentToBeAdded = new equipment_1.Equipment("machine", "ok", "room 2", seller, 0, 9888.9, 1);
        const newId = await fakeEquipmentRepo.add(equipmentToBeAdded);
        const newStatus = "broken";
        await fakeEquipmentRepo.updateStatus(newId, newStatus);
        expect(equipmentToBeAdded.status).toEqual(newStatus);
    });
    it("updates the maintenance cost of a given equipment", async () => {
        const equipmentToBeAdded = new equipment_1.Equipment("machine", "ok", "room 2", seller, 0, 9888.9, 1);
        const newId = await fakeEquipmentRepo.add(equipmentToBeAdded);
        const firstCost = 1000.0;
        const secondCost = 1200.0;
        await fakeEquipmentRepo.updateMaintenanceCost(newId, firstCost);
        expect(equipmentToBeAdded.totalMaintenanceCost).toEqual(firstCost);
        await fakeEquipmentRepo.updateMaintenanceCost(newId, secondCost);
        expect(equipmentToBeAdded.totalMaintenanceCost).toEqual(firstCost + secondCost);
    });
    it("removes a given equipment from the repository", async () => {
        const equipmentToBeAdded1 = new equipment_1.Equipment("machine", "ok", "room 2", seller, 0, 9888.9, 1);
        const newId1 = await fakeEquipmentRepo.add(equipmentToBeAdded1);
        const equipmentToBeAdded2 = new equipment_1.Equipment("vehicle", "broken", "room 3", seller, 0, 19888.9, 1);
        const newId2 = await fakeEquipmentRepo.add(equipmentToBeAdded2);
        await fakeEquipmentRepo.delete(newId1);
        expect(fakeEquipmentRepo.equipments.includes(equipmentToBeAdded1)).toBeFalsy();
        expect(fakeEquipmentRepo.equipments.includes(equipmentToBeAdded2)).toBeTruthy();
    });
});
