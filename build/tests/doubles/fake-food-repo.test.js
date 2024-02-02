"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_food_repo_1 = require("../../src/doubles/fake-food-repo");
const businessPartner_1 = require("../../src/entities/businessPartner");
const food_1 = require("../../src/entities/food");
let fakeFoodRepo;
describe("fake food repository", () => {
    beforeEach(() => {
        fakeFoodRepo = new fake_food_repo_1.FakeFoodRepo();
    });
    const seller = new businessPartner_1.BusinessPartner(8999, "company@mail.com", "company", "street 2");
    it("adds a food to the repository", async () => {
        const foodToBeAdded = new food_1.Food("flakes", 200, 100.99, new Date("2000-01-01"), seller);
        const newId = await fakeFoodRepo.add(foodToBeAdded);
        expect(newId).toBeTruthy();
        expect(fakeFoodRepo.foods[0].id).toEqual(newId);
    });
    it("finds a food by id", async () => {
        const foodToBeAdded = new food_1.Food("flakes", 200, 100.99, new Date("2000-01-01"), seller);
        const newId = await fakeFoodRepo.add(foodToBeAdded);
        const retrievedFood = await fakeFoodRepo.find(newId);
        expect(retrievedFood).toBeDefined();
        expect(retrievedFood?.id).toEqual(foodToBeAdded.id);
    });
    it("removes a food from the repository", async () => {
        const foodToBeAdded1 = new food_1.Food("flakes", 200, 100.99, new Date("2000-01-01"), seller);
        const newId1 = await fakeFoodRepo.add(foodToBeAdded1);
        const foodToBeAdded2 = new food_1.Food("pallets", 300, 200.99, new Date("2001-01-01"), seller);
        const newId2 = await fakeFoodRepo.add(foodToBeAdded2);
        await fakeFoodRepo.delete(newId1);
        expect(fakeFoodRepo.foods.includes(foodToBeAdded1)).toBeFalsy();
        expect(fakeFoodRepo.foods.includes(foodToBeAdded2)).toBeTruthy();
    });
    it("updates the storage of a given food", async () => {
        const foodToBeAdded = new food_1.Food("flakes", 200, 100.99, new Date("2000-01-01"), seller);
        const newId = await fakeFoodRepo.add(foodToBeAdded);
        const quantity = 123;
        await fakeFoodRepo.updateStorage(newId, quantity);
        expect(fakeFoodRepo.foods[0].quantity).toEqual(quantity);
    });
});
