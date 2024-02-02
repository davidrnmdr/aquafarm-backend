"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_medication_repo_1 = require("../../src/doubles/fake-medication-repo");
const businessPartner_1 = require("../../src/entities/businessPartner");
const employee_1 = require("../../src/entities/employee");
const medication_1 = require("../../src/entities/medication");
const treatment_1 = require("../../src/entities/treatment");
const tank_1 = require("../../src/entities/tank");
const fishSpecie_1 = require("../../src/entities/fishSpecie");
let fakeMedicationRepo;
/*
Adding a medication to the repository means that the used treatment
must have it's storage decreased, but since this is a higher level
behavior we will let it to be tested at ./src/app.ts.
*/
describe("fake medication repository", () => {
    beforeEach(() => {
        fakeMedicationRepo = new fake_medication_repo_1.FakeMedicationRepo();
    });
    const specie = new fishSpecie_1.FishSpecie("tilapia", "flakes", { min: 16.5, max: 30 }, { min: 10, max: 15 }, { min: 5, max: 8 });
    const employee = new employee_1.Employee("david", "david@mail.com", "president", "123");
    const employee2 = new employee_1.Employee("aaron", "aaron@mail.com", "president", "123");
    const tank = new tank_1.Tank(specie, "LB-2", "room 3", 60, 1200);
    const seller = new businessPartner_1.BusinessPartner(9982, "company@mail.com", "company llc", "street 5");
    const treatment = new treatment_1.Treatment("skin med", 200, 1200.99, new Date("2024-12-12"), seller);
    it("adds a medication to the repository", async () => {
        const medicationToBeAdded = new medication_1.Medication(employee, tank, treatment, 2, new Date("2023-10-11"));
        const newId = await fakeMedicationRepo.add(medicationToBeAdded);
        expect(newId).toBeTruthy();
        expect(fakeMedicationRepo.medications[0].id).toEqual(newId);
    });
    it("finds a medication by id", async () => {
        const medicationToBeAdded = new medication_1.Medication(employee, tank, treatment, 2, new Date("2023-10-11"));
        const newId = await fakeMedicationRepo.add(medicationToBeAdded);
        const retrievedMedication = await fakeMedicationRepo.find(newId);
        expect(retrievedMedication).toBeDefined();
        expect(retrievedMedication?.id).toEqual(medicationToBeAdded.id);
    });
    it("finds medications by some given employee attribute", async () => {
        const medicationToBeAdded = new medication_1.Medication(employee, tank, treatment, 2, new Date("2023-10-11"));
        const newId = await fakeMedicationRepo.add(medicationToBeAdded);
        const medicationToBeAdded2 = new medication_1.Medication(employee2, tank, treatment, 2, new Date("2023-10-11"));
        const newId2 = await fakeMedicationRepo.add(medicationToBeAdded2);
        const medicationsByEmail = await fakeMedicationRepo.findByEmployee("email", "david@mail.com");
        const medicationsByName = await fakeMedicationRepo.findByEmployee("name", "aaron");
        const medicationsByRole = await fakeMedicationRepo.findByEmployee("role", "president");
        expect(medicationsByEmail.includes(medicationToBeAdded)).toBeTruthy();
        expect(medicationsByEmail).toHaveLength(1);
        expect(medicationsByName.includes(medicationToBeAdded2)).toBeTruthy();
        expect(medicationsByName).toHaveLength(1);
        expect(medicationsByRole.includes(medicationToBeAdded)).toBeTruthy();
        expect(medicationsByRole.includes(medicationToBeAdded2)).toBeTruthy();
        expect(medicationsByRole).toHaveLength(2);
    });
    it("removes a given medication from the repository", async () => {
        const medicationToBeAdded1 = new medication_1.Medication(employee, tank, treatment, 2, new Date("2023-10-11"));
        const newId1 = await fakeMedicationRepo.add(medicationToBeAdded1);
        const medicationToBeAdded2 = new medication_1.Medication(employee, tank, treatment, 4, new Date("2024-10-11"));
        const newId2 = await fakeMedicationRepo.add(medicationToBeAdded2);
        await fakeMedicationRepo.delete(newId1);
        expect(fakeMedicationRepo.medications.includes(medicationToBeAdded1)).toBeFalsy();
        expect(fakeMedicationRepo.medications.includes(medicationToBeAdded2))
            .toBeTruthy;
    });
});
