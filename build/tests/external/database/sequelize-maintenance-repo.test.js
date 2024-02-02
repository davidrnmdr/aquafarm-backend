"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const businessPartner_1 = require("../../../src/entities/businessPartner");
const employee_1 = require("../../../src/entities/employee");
const equipment_1 = require("../../../src/entities/equipment");
const maintenance_1 = require("../../../src/entities/maintenance");
const models_1 = require("../../../src/services/database/models");
const sequelize_businessPartner_repo_1 = require("../../../src/services/database/sequelize-businessPartner-repo");
const sequelize_employee_repo_1 = require("../../../src/services/database/sequelize-employee-repo");
const sequelize_equipment_repo_1 = require("../../../src/services/database/sequelize-equipment-repo");
const sequelize_maintenance_repo_1 = require("../../../src/services/database/sequelize-maintenance-repo");
describe("sequelize maintenance repository", () => {
    const sequelizeMaintenanceRepo = new sequelize_maintenance_repo_1.SequelizeMaintenanceRepo();
    const sequelizePartnerRepo = new sequelize_businessPartner_repo_1.SequelizeBusinessPartnerRepo();
    const sequelizeEquipmentRepo = new sequelize_equipment_repo_1.SequelizeEquipmentRepo();
    const sequelizeEmployeeRepo = new sequelize_employee_repo_1.SequelizeEmployeeRepo();
    let seller;
    let sellerId;
    let equipment;
    let equipmentId;
    let employee;
    let employeeId;
    let employee2;
    let employeeId2;
    let maintenance;
    let maintenance2;
    let newId;
    let newId2;
    beforeEach(async () => {
        await models_1.Employees.sync({ force: true });
        await models_1.BusinessPartners.sync({ force: true });
        await models_1.Equipments.sync({ force: true });
        await models_1.Maintenances.sync({ force: true });
        sellerId = await sequelizePartnerRepo.add((seller = new businessPartner_1.BusinessPartner(198, "company@main.com", "company llc", "street 7, 433")));
        equipmentId = await sequelizeEquipmentRepo.add((equipment = new equipment_1.Equipment("heater", "new", "room 6", seller, 0, 1900, 2)));
        employeeId = await sequelizeEmployeeRepo.add((employee = new employee_1.Employee("david", "david@mail.com", "president", "123")));
        employeeId2 = await sequelizeEmployeeRepo.add((employee2 = new employee_1.Employee("aaron", "aaron@mail.com", "president", "321")));
        newId = await sequelizeMaintenanceRepo.add((maintenance = new maintenance_1.Maintenance(equipment, employee, new Date(), 100)));
        newId2 = await sequelizeMaintenanceRepo.add((maintenance2 = new maintenance_1.Maintenance(equipment, employee2, new Date(), 200)));
    }, 20000);
    afterAll(async () => {
        await models_1.Employees.sync({ force: true });
        await models_1.BusinessPartners.sync({ force: true });
        await models_1.Equipments.sync({ force: true });
        await models_1.Maintenances.sync({ force: true });
    }, 20000);
    it("adds a maintenance to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("finds a feeding by id", async () => {
        const retrievedMaintenance = await sequelizeMaintenanceRepo.find(newId);
        const shouldBeUndefined = await sequelizeMaintenanceRepo.find("12345");
        expect(retrievedMaintenance).toBeInstanceOf(maintenance_1.Maintenance);
        expect(retrievedMaintenance?.id).toEqual(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("finds maintenances by some given employee attribute", async () => {
        const maintenancesByEmail = await sequelizeMaintenanceRepo.findByEmployee("email", "david@mail.com");
        const maintenancesByName = await sequelizeMaintenanceRepo.findByEmployee("name", "aaron");
        const maintenancesByRole = await sequelizeMaintenanceRepo.findByEmployee("role", "president");
        expect(JSON.stringify(maintenancesByEmail[0])).toEqual(JSON.stringify(maintenance));
        expect(maintenancesByEmail[1]).toBeFalsy();
        expect(JSON.stringify(maintenancesByName[0])).toEqual(JSON.stringify(maintenance2));
        expect(maintenancesByName[1]).toBeFalsy();
        expect(JSON.stringify(maintenancesByRole[0])).toEqual(JSON.stringify(maintenance));
        expect(JSON.stringify(maintenancesByRole[1])).toEqual(JSON.stringify(maintenance2));
        expect(maintenancesByRole[2]).toBeFalsy();
    }, 10000);
    it("deletes a given maintenance", async () => {
        await sequelizeMaintenanceRepo.delete(newId);
        const shouldBeUndefined = await sequelizeMaintenanceRepo.find(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("lists all maintenances", async () => {
        const maintenanceList = await sequelizeMaintenanceRepo.list();
        expect(maintenanceList[0]).toBeInstanceOf(maintenance_1.Maintenance);
        expect(maintenanceList[0].id).toEqual(newId);
        expect(maintenanceList[1].id).toEqual(newId2);
    });
});
