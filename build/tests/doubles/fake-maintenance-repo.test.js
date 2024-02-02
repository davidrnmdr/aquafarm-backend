"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_maintenance_repo_1 = require("../../src/doubles/fake-maintenance-repo");
const businessPartner_1 = require("../../src/entities/businessPartner");
const employee_1 = require("../../src/entities/employee");
const equipment_1 = require("../../src/entities/equipment");
const maintenance_1 = require("../../src/entities/maintenance");
let fakeMaintenanceRepo;
/*
Registering a maintenance event implies on the increment of the field
totalMaintenanceCost of the equipment and change of its status however,
since this is a higher level feature, we will test this behaviour at ./src/app.ts
*/
describe("fake maintenance repository", () => {
    beforeEach(() => {
        fakeMaintenanceRepo = new fake_maintenance_repo_1.FakeMaintenanceRepo();
    });
    const partner = new businessPartner_1.BusinessPartner(2233, "company@mail.com", "company llc", "street 8");
    const equipment = new equipment_1.Equipment("machine", "broken", "room 2", partner, 0, 299.9, 1);
    const employee = new employee_1.Employee("david", "david@mail.com", "president", "123");
    const employee2 = new employee_1.Employee("aaron", "aaron@mail.com", "president", "123");
    it("adds a maintenance to the repository", async () => {
        const maintenanceToBeAdded = new maintenance_1.Maintenance(equipment, employee, new Date("2023-12-20"), 982.9);
        const newId = await fakeMaintenanceRepo.add(maintenanceToBeAdded);
        expect(newId).toBeTruthy();
        expect(fakeMaintenanceRepo.maintenances[0].id).toEqual(newId);
    });
    it("finds a maintenance by id", async () => {
        const maintenanceToBeAdded = new maintenance_1.Maintenance(equipment, employee, new Date("2023-12-20"), 982.9);
        const newId = await fakeMaintenanceRepo.add(maintenanceToBeAdded);
        const retrievedMaintenance = await fakeMaintenanceRepo.find(newId);
        expect(retrievedMaintenance).toBeDefined();
        expect(retrievedMaintenance?.id).toEqual(maintenanceToBeAdded.id);
    });
    it("finds maintenances by some given employee attribute", async () => {
        const maintenanceToBeAdded = new maintenance_1.Maintenance(equipment, employee, new Date("2023-12-20"), 982.9);
        const newId = await fakeMaintenanceRepo.add(maintenanceToBeAdded);
        const maintenanceToBeAdded2 = new maintenance_1.Maintenance(equipment, employee2, new Date("2023-12-20"), 982.9);
        const newId2 = await fakeMaintenanceRepo.add(maintenanceToBeAdded2);
        const maintenancesByEmail = await fakeMaintenanceRepo.findByEmployee("email", "david@mail.com");
        const maintenancesByName = await fakeMaintenanceRepo.findByEmployee("name", "aaron");
        const maintenancesByRole = await fakeMaintenanceRepo.findByEmployee("role", "president");
        expect(maintenancesByEmail.includes(maintenanceToBeAdded)).toBeTruthy();
        expect(maintenancesByEmail).toHaveLength(1);
        expect(maintenancesByName.includes(maintenanceToBeAdded2)).toBeTruthy();
        expect(maintenancesByName).toHaveLength(1);
        expect(maintenancesByRole.includes(maintenanceToBeAdded)).toBeTruthy();
        expect(maintenancesByRole.includes(maintenanceToBeAdded2)).toBeTruthy();
        expect(maintenancesByRole).toHaveLength(2);
    });
    it("removes a given maintenance from the repository", async () => {
        const maintenanceToBeAdded1 = new maintenance_1.Maintenance(equipment, employee, new Date("2023-12-20"), 982.9);
        const newId1 = await fakeMaintenanceRepo.add(maintenanceToBeAdded1);
        const maintenanceToBeAdded2 = new maintenance_1.Maintenance(equipment, employee, new Date("2023-12-19"), 982.9);
        const newId2 = await fakeMaintenanceRepo.add(maintenanceToBeAdded2);
        await fakeMaintenanceRepo.delete(newId1);
        expect(fakeMaintenanceRepo.maintenances.includes(maintenanceToBeAdded1)).toBeFalsy();
        expect(fakeMaintenanceRepo.maintenances.includes(maintenanceToBeAdded2)).toBeTruthy();
    });
});
