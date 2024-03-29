"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_tankVerification_repo_1 = require("../../src/doubles/fake-tankVerification-repo");
const employee_1 = require("../../src/entities/employee");
const fishSpecie_1 = require("../../src/entities/fishSpecie");
const tank_1 = require("../../src/entities/tank");
const tankVerification_1 = require("../../src/entities/tankVerification");
let fakeTankVerificationRepo;
describe("fake tank verification repository", () => {
    beforeEach(() => {
        fakeTankVerificationRepo = new fake_tankVerification_repo_1.FakeTankVerificationRepo();
    });
    const specie = new fishSpecie_1.FishSpecie("tilapia", "flakes", { min: 16.5, max: 30 }, { min: 10, max: 15 }, { min: 5, max: 8 });
    const tank = new tank_1.Tank(specie, "M-B1", "room 2", 23.1, 1300);
    const employee = new employee_1.Employee("david", "david@mail.com", "president", "123");
    const employee2 = new employee_1.Employee("aaron", "aaron@mail.com", "president", "123");
    it("adds a verification to the repository", async () => {
        const verificationToBeAdded = new tankVerification_1.TankVerification(tank, employee, 23.45, 20.2, 7, new Date("2023-11-10"));
        const newId = await fakeTankVerificationRepo.add(verificationToBeAdded);
        expect(newId).toBeTruthy();
        expect(fakeTankVerificationRepo.verifications[0].id).toEqual(newId);
    });
    it("finds a verification by id", async () => {
        const verificationToBeAdded = new tankVerification_1.TankVerification(tank, employee, 23.45, 20.2, 7, new Date("2023-11-10"));
        const newId = await fakeTankVerificationRepo.add(verificationToBeAdded);
        const retrievedVerification = await fakeTankVerificationRepo.find(newId);
        expect(retrievedVerification).toBeDefined();
        expect(retrievedVerification?.id).toEqual(verificationToBeAdded.id);
    });
    it("finds verifications by some employee attribute passed", async () => {
        const verificationToBeAdded = new tankVerification_1.TankVerification(tank, employee, 23.45, 20.2, 7, new Date("2023-11-10"));
        const newId = await fakeTankVerificationRepo.add(verificationToBeAdded);
        const verificationToBeAdded2 = new tankVerification_1.TankVerification(tank, employee2, 23.45, 20.2, 7, new Date("2023-11-10"));
        const newId2 = await fakeTankVerificationRepo.add(verificationToBeAdded2);
        const verificationsByEmail = await fakeTankVerificationRepo.findByEmployee("email", "david@mail.com");
        const verificationsByName = await fakeTankVerificationRepo.findByEmployee("name", "aaron");
        const verificationsByRole = await fakeTankVerificationRepo.findByEmployee("role", "president");
        expect(verificationsByEmail.includes(verificationToBeAdded)).toBeTruthy();
        expect(verificationsByEmail).toHaveLength(1);
        expect(verificationsByName.includes(verificationToBeAdded2)).toBeTruthy();
        expect(verificationsByName).toHaveLength(1);
        expect(verificationsByRole.includes(verificationToBeAdded)).toBeTruthy();
        expect(verificationsByRole.includes(verificationToBeAdded2)).toBeTruthy();
        expect(verificationsByRole).toHaveLength(2);
    });
    it("removes a verification from the repository", async () => {
        const verificationToBeAdded1 = new tankVerification_1.TankVerification(tank, employee, 24.2, 21.3, 6.5, new Date("2023-11-10"));
        const newId1 = await fakeTankVerificationRepo.add(verificationToBeAdded1);
        const verificationToBeAdded2 = new tankVerification_1.TankVerification(tank, employee, 23.45, 20.2, 7, new Date("2023-11-10"));
        const newId2 = await fakeTankVerificationRepo.add(verificationToBeAdded2);
        await fakeTankVerificationRepo.delete(newId1);
        expect(fakeTankVerificationRepo.verifications.includes(verificationToBeAdded1)).toBeFalsy();
        expect(fakeTankVerificationRepo.verifications.includes(verificationToBeAdded2)).toBeTruthy();
    });
});
