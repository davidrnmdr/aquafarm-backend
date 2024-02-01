"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_feeding_repo_1 = require("../../src/doubles/fake-feeding-repo");
const businessPartner_1 = require("../../src/entities/businessPartner");
const employee_1 = require("../../src/entities/employee");
const feeding_1 = require("../../src/entities/feeding");
const fishSpecie_1 = require("../../src/entities/fishSpecie");
const food_1 = require("../../src/entities/food");
const tank_1 = require("../../src/entities/tank");
let fakeFeedingRepo;
/*
Adding a feeding to the repository means that some employee has spent food,
which means that we must access the food repository and decrement a given food quantity.
In addition to that, obviosly, that food must have (at least) a quantity that is required to that particular feeding.
But since this behavior is a higher level one we left it to be tested with relation with ./src/app.ts.
*/
describe("fake feeding repository", () => {
    beforeEach(() => {
        fakeFeedingRepo = new fake_feeding_repo_1.FakeFeedingRepo();
    });
    const specie = new fishSpecie_1.FishSpecie("tilapia", "flakes", { min: 16.5, max: 30 }, { min: 10, max: 15 }, { min: 5, max: 8 });
    const employee = new employee_1.Employee("david", "david@mail.com", "president", "123");
    const employee2 = new employee_1.Employee("aaron", "aaron@mail.com", "president", "123");
    const tank = new tank_1.Tank(specie, "LB-2", "room 3", 60, 1200);
    const seller = new businessPartner_1.BusinessPartner(9982, "company@mail.com", "company llc", "street 5");
    const food = new food_1.Food("flakes", 200, 1200.99, new Date("2024-12-12"), seller);
    it("adds a feeding to the repository", async () => {
        const feedingToBeAdded = new feeding_1.Feeding(employee, tank, food, 2, new Date("2023-10-11"));
        const newId = await fakeFeedingRepo.add(feedingToBeAdded);
        expect(newId).toBeTruthy();
        expect(fakeFeedingRepo.feedings[0].id).toEqual(newId);
    });
    it("finds a feeding by id", async () => {
        const feedingToBeAdded = new feeding_1.Feeding(employee, tank, food, 2, new Date("2023-10-11"));
        const newId = await fakeFeedingRepo.add(feedingToBeAdded);
        const retrievedFeeding = await fakeFeedingRepo.find(newId);
        expect(retrievedFeeding).toBeDefined();
        expect(retrievedFeeding?.id).toEqual(feedingToBeAdded.id);
    });
    it("finds feedings by some given employee attribute", async () => {
        const feedingToBeAdded = new feeding_1.Feeding(employee, tank, food, 2, new Date("2023-10-11"));
        const newId = await fakeFeedingRepo.add(feedingToBeAdded);
        const feedingToBeAdded2 = new feeding_1.Feeding(employee2, tank, food, 2, new Date("2023-10-11"));
        const newId2 = await fakeFeedingRepo.add(feedingToBeAdded2);
        const feedingsByEmail = await fakeFeedingRepo.findByEmployee("email", "david@mail.com");
        const feedingsByName = await fakeFeedingRepo.findByEmployee("name", "aaron");
        const feedingsByRole = await fakeFeedingRepo.findByEmployee("role", "president");
        expect(feedingsByEmail.includes(feedingToBeAdded)).toBeTruthy();
        expect(feedingsByEmail).toHaveLength(1);
        expect(feedingsByName.includes(feedingToBeAdded2)).toBeTruthy();
        expect(feedingsByName).toHaveLength(1);
        expect(feedingsByRole.includes(feedingToBeAdded)).toBeTruthy();
        expect(feedingsByRole.includes(feedingToBeAdded2)).toBeTruthy();
        expect(feedingsByRole).toHaveLength(2);
    });
    it("removes a given feeding from the repository", async () => {
        const feedingToBeAdded1 = new feeding_1.Feeding(employee, tank, food, 2, new Date("2023-10-11"));
        const newId1 = await fakeFeedingRepo.add(feedingToBeAdded1);
        const feedingToBeAdded2 = new feeding_1.Feeding(employee, tank, food, 4, new Date("2024-10-11"));
        const newId2 = await fakeFeedingRepo.add(feedingToBeAdded2);
        await fakeFeedingRepo.delete(newId1);
        expect(fakeFeedingRepo.feedings.includes(feedingToBeAdded1)).toBeFalsy();
        expect(fakeFeedingRepo.feedings.includes(feedingToBeAdded2)).toBeTruthy;
    });
});
