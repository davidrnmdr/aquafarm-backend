"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_treatment_repo_1 = require("../../src/doubles/fake-treatment-repo");
const businessPartner_1 = require("../../src/entities/businessPartner");
const treatment_1 = require("../../src/entities/treatment");
let fakeTreatmentRepo;
describe("fake treatment repository", () => {
    beforeEach(() => {
        fakeTreatmentRepo = new fake_treatment_repo_1.FakeTreatmentRepo();
    });
    const partner = new businessPartner_1.BusinessPartner(2828, "company@mail.com", "company llc", "street 9");
    it("adds a treatment to the repository", async () => {
        const treatmentToBeAdded = new treatment_1.Treatment("skin med", 120, 12000, new Date("2024-09-10"), partner);
        const newId = await fakeTreatmentRepo.add(treatmentToBeAdded);
        expect(newId).toBeTruthy();
        expect(fakeTreatmentRepo.treatments[0].id).toEqual(newId);
    });
    it("finds a treatment by id", async () => {
        const treatmentToBeAdded = new treatment_1.Treatment("skin med", 120, 12000, new Date("2024-09-10"), partner);
        const newId = await fakeTreatmentRepo.add(treatmentToBeAdded);
        const retrievedTreatment = await fakeTreatmentRepo.find(newId);
        expect(retrievedTreatment).toBeDefined();
        expect(retrievedTreatment?.id).toEqual(treatmentToBeAdded.id);
    });
    it("updates the storage of a given treatment", async () => {
        const treatmentToBeAdded = new treatment_1.Treatment("skin med", 120, 12000, new Date("2024-09-10"), partner);
        const newId = await fakeTreatmentRepo.add(treatmentToBeAdded);
        const newQuantity = 10;
        await fakeTreatmentRepo.updateStorage(newId, newQuantity);
        expect(treatmentToBeAdded.quantity).toEqual(newQuantity);
    });
    it("removes a treatment from the repository", async () => {
        const treatmentToBeAdded1 = new treatment_1.Treatment("skin med", 220, 25000, new Date("2024-11-10"), partner);
        const newId1 = await fakeTreatmentRepo.add(treatmentToBeAdded1);
        const treatmentToBeAdded2 = new treatment_1.Treatment("skin med", 120, 12000, new Date("2024-09-10"), partner);
        const newId2 = await fakeTreatmentRepo.add(treatmentToBeAdded2);
        await fakeTreatmentRepo.delete(newId1);
        expect(fakeTreatmentRepo.treatments.includes(treatmentToBeAdded1)).toBeFalsy();
        expect(fakeTreatmentRepo.treatments.includes(treatmentToBeAdded2)).toBeTruthy();
    });
});
