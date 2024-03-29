"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_tank_repo_1 = require("../../src/doubles/fake-tank-repo");
const fishSpecie_1 = require("../../src/entities/fishSpecie");
const tank_1 = require("../../src/entities/tank");
let fakeTankRepo;
describe("fake tank repository", () => {
    beforeEach(() => {
        fakeTankRepo = new fake_tank_repo_1.FakeTankRepo();
    });
    const specie = new fishSpecie_1.FishSpecie("tilapia", "flakes", { min: 16.5, max: 30 }, { min: 10, max: 15 }, { min: 5, max: 8 });
    it("adds a tank to the repository", async () => {
        const tankToBeAdded = new tank_1.Tank(specie, "L-B2", "room 6", 98, 2000);
        const newId = await fakeTankRepo.add(tankToBeAdded);
        expect(newId).toBeTruthy();
        expect(fakeTankRepo.tanks[0].id).toEqual(tankToBeAdded.id);
    });
    it("finds a tank by id", async () => {
        const tankToBeAdded = new tank_1.Tank(specie, "L-B2", "room 6", 98, 2000);
        const newId = await fakeTankRepo.add(tankToBeAdded);
        const retrievedTank = await fakeTankRepo.find(newId);
        expect(retrievedTank).toBeDefined();
        expect(retrievedTank?.id).toEqual(tankToBeAdded.id);
    });
    it("finds a tank by a given attribute", async () => {
        const tankToBeAdded = new tank_1.Tank(specie, "L-B2", "room 6", 98, 2000);
        const newId = await fakeTankRepo.add(tankToBeAdded);
        const retrievedTanksList = [
            await fakeTankRepo.findBy("type", "L-B2"),
            await fakeTankRepo.findBy("type", "S-B2"),
            await fakeTankRepo.findBy("capacity", 2000),
            await fakeTankRepo.findBy("capacity", 1000),
            await fakeTankRepo.findBy("location", "room 6"),
            await fakeTankRepo.findBy("location", "room 2"),
            await fakeTankRepo.findBy("status", 98),
            await fakeTankRepo.findBy("status", 97),
        ];
        retrievedTanksList.forEach((tankArray, i) => {
            expect(tankArray?.includes(tankToBeAdded)).toEqual(i % 2 === 0 ? true : false);
        });
    });
    it("updates the status of a given tank", async () => {
        const tankToBeAdded = new tank_1.Tank(specie, "L-B2", "room 6", 98, 2000);
        const newId = await fakeTankRepo.add(tankToBeAdded);
        const newStatus = 89.8;
        await fakeTankRepo.updateStatus(newId, newStatus);
        expect(tankToBeAdded.status).toEqual(newStatus);
    });
    it("removes a given tank from the repository", async () => {
        const tankToBeAdded1 = new tank_1.Tank(specie, "L-B2", "room 6", 98, 2000);
        const newId1 = await fakeTankRepo.add(tankToBeAdded1);
        const tankToBeAdded2 = new tank_1.Tank(specie, "S-C2", "room 9", 98, 2000);
        const newId2 = await fakeTankRepo.add(tankToBeAdded2);
        await fakeTankRepo.delete(newId1);
        expect(fakeTankRepo.tanks.includes(tankToBeAdded1)).toBeFalsy();
        expect(fakeTankRepo.tanks.includes(tankToBeAdded2)).toBeTruthy();
    });
});
