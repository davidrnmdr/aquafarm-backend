"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../../../src/entities/employee");
const fishSpecie_1 = require("../../../src/entities/fishSpecie");
const tank_1 = require("../../../src/entities/tank");
const tankVerification_1 = require("../../../src/entities/tankVerification");
const models_1 = require("../../../src/services/database/models");
const sequelize_employee_repo_1 = require("../../../src/services/database/sequelize-employee-repo");
const sequelize_fishSpecie_repo_1 = require("../../../src/services/database/sequelize-fishSpecie-repo");
const sequelize_tank_repo_1 = require("../../../src/services/database/sequelize-tank-repo");
const sequelize_tankVerification_repo_1 = require("../../../src/services/database/sequelize-tankVerification-repo");
describe("sequelize tank verification repository", () => {
    const sequelizeVerificationRepo = new sequelize_tankVerification_repo_1.SequelizeTankVerificationRepo();
    const sequelizeSpecieRepo = new sequelize_fishSpecie_repo_1.SequelizeFishSpecieRepo();
    const sequelizeTankRepo = new sequelize_tank_repo_1.SequelizeTankRepo();
    const sequelizeEmployeeRepo = new sequelize_employee_repo_1.SequelizeEmployeeRepo();
    let specie;
    let specieId;
    let tank;
    let tankId;
    let employee;
    let employeeId;
    let employee2;
    let employeeId2;
    let verification;
    let newId;
    let verification2;
    let newId2;
    beforeEach(async () => {
        await models_1.FishSpecies.sync({ force: true });
        await models_1.Tanks.sync({ force: true });
        await models_1.Employees.sync({ force: true });
        await models_1.Verifications.sync({ force: true });
        specieId = await sequelizeSpecieRepo.add((specie = new fishSpecie_1.FishSpecie("tilapia", "flakes", { min: 20, max: 28 }, { min: 13, max: 22 }, { min: 5, max: 8 })));
        tankId = await sequelizeTankRepo.add((tank = new tank_1.Tank(specie, "M-2B", "room 1", 40, 900)));
        employeeId = await sequelizeEmployeeRepo.add((employee = new employee_1.Employee("david", "david@mail.com", "president", "123")));
        employeeId2 = await sequelizeEmployeeRepo.add((employee2 = new employee_1.Employee("aaron", "aaron@mail.com", "president", "321")));
        newId = await sequelizeVerificationRepo.add((verification = new tankVerification_1.TankVerification(tank, employee, 23, 15, 7, new Date())));
        newId2 = await sequelizeVerificationRepo.add((verification2 = new tankVerification_1.TankVerification(tank, employee2, 23, 15, 7, new Date())));
    }, 20000);
    afterAll(async () => {
        await models_1.FishSpecies.sync({ force: true });
        await models_1.Tanks.sync({ force: true });
        await models_1.Employees.sync({ force: true });
        await models_1.Verifications.sync({ force: true });
    }, 20000);
    it("adds a verification to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("finds a verification by id", async () => {
        const retrievedVerification = await sequelizeVerificationRepo.find(newId);
        const shouldBeUndefined = await sequelizeVerificationRepo.find("12345");
        expect(retrievedVerification).toBeInstanceOf(tankVerification_1.TankVerification);
        expect(retrievedVerification?.id).toEqual(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("finds verifications by some given employee attribute", async () => {
        const verificationsByEmail = await sequelizeVerificationRepo.findByEmployee("email", "david@mail.com");
        const verificationsByName = await sequelizeVerificationRepo.findByEmployee("name", "aaron");
        const verificationsByRole = await sequelizeVerificationRepo.findByEmployee("role", "president");
        expect(JSON.stringify(verificationsByEmail[0])).toEqual(JSON.stringify(verification));
        expect(verificationsByEmail[1]).toBeFalsy();
        expect(JSON.stringify(verificationsByName[0])).toEqual(JSON.stringify(verification2));
        expect(verificationsByName[1]).toBeFalsy();
        expect(JSON.stringify(verificationsByRole[0])).toEqual(JSON.stringify(verification));
        expect(JSON.stringify(verificationsByRole[1])).toEqual(JSON.stringify(verification2));
        expect(verificationsByRole[2]).toBeFalsy();
    }, 10000);
    it("deletes a given verification", async () => {
        await sequelizeVerificationRepo.delete(newId);
        const shouldBeUndefined = await sequelizeVerificationRepo.find(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("lists all verifications", async () => {
        const verificationList = await sequelizeVerificationRepo.list();
        expect(verificationList[0]).toBeInstanceOf(tankVerification_1.TankVerification);
        expect(verificationList[0].id).toEqual(newId);
        expect(verificationList[1].id).toEqual(newId2);
    });
});
