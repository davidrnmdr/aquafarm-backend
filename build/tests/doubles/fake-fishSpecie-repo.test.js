"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_fishSpecie_repo_1 = require("../../src/doubles/fake-fishSpecie-repo");
const fishSpecie_1 = require("../../src/entities/fishSpecie");
describe("fake fish specie repo", () => {
    let fakeFishSpecieRepo;
    beforeEach(() => {
        fakeFishSpecieRepo = new fake_fishSpecie_repo_1.FakeFishSpecieRepo();
    });
    it("adds a fish specie to the repo", async () => {
        const specie = new fishSpecie_1.FishSpecie("boga", "flakes", { min: 10, max: 20 }, { min: 12, max: 480 }, { min: 4, max: 10 });
        const newId = await fakeFishSpecieRepo.add(specie);
        expect(fakeFishSpecieRepo.species.includes(specie)).toBeTruthy();
        expect(newId).toBeTruthy();
    });
    it("deletes a fish specie from the repo", async () => {
        const specie = new fishSpecie_1.FishSpecie("boga", "flakes", { min: 10, max: 20 }, { min: 12, max: 480 }, { min: 4, max: 10 });
        const newId = await fakeFishSpecieRepo.add(specie);
        await fakeFishSpecieRepo.delete(newId);
        expect(fakeFishSpecieRepo.species.includes(specie)).toBeFalsy();
        console.log(fakeFishSpecieRepo.species);
    });
});
