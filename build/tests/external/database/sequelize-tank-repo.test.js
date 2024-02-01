"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fishSpecie_1 = require("../../../src/entities/fishSpecie");
const tank_1 = require("../../../src/entities/tank");
const models_1 = require("../../../src/services/database/models");
const sequelize_fishSpecie_repo_1 = require("../../../src/services/database/sequelize-fishSpecie-repo");
const sequelize_tank_repo_1 = require("../../../src/services/database/sequelize-tank-repo");
describe("sequelize tank repository", () => {
    const sequelizeFishSpecieRepo = new sequelize_fishSpecie_repo_1.SequelizeFishSpecieRepo();
    const sequelizeTankRepo = new sequelize_tank_repo_1.SequelizeTankRepo();
    let newId;
    let newId2;
    let specieId;
    let tank;
    let tank2;
    const specie = new fishSpecie_1.FishSpecie("tilapia", "flakes", { min: 15, max: 26 }, { min: 12, max: 19 }, { min: 5, max: 8 });
    beforeEach(async () => {
        await models_1.Tanks.sync({ force: true });
        await models_1.FishSpecies.sync({ force: true });
        specieId = await sequelizeFishSpecieRepo.add(specie);
        newId = await sequelizeTankRepo.add((tank = new tank_1.Tank(specie, "L-2B", "room 2", 45, 1200)));
        newId2 = await sequelizeTankRepo.add((tank2 = new tank_1.Tank(specie, "M-1B", "room 2", 50, 700)));
    });
    afterAll(async () => {
        await models_1.Tanks.sync({ force: true });
        await models_1.FishSpecies.sync({ force: true });
    });
    it("adds a tank to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("finds a tank by id", async () => {
        const retrievedTank = await sequelizeTankRepo.find(newId);
        const shouldBeUndefined = await sequelizeTankRepo.find("12345");
        expect(retrievedTank).toBeInstanceOf(tank_1.Tank);
        expect(retrievedTank?.id).toEqual(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("finds tanks by a given attribute", async () => {
        const tanksByType = await sequelizeTankRepo.findBy("type", "L-2B");
        const tanksByCapacity = await sequelizeTankRepo.findBy("capacity", 700);
        const tanksByLocation = await sequelizeTankRepo.findBy("location", "room 2");
        const tanksByStatus = await sequelizeTankRepo.findBy("status", 50);
        expect(JSON.stringify(tanksByType[0])).toEqual(JSON.stringify(tank));
        expect(tanksByType[1]).toBeFalsy();
        expect(JSON.stringify(tanksByCapacity[0])).toEqual(JSON.stringify(tank2));
        expect(tanksByCapacity[1]).toBeFalsy();
        expect(JSON.stringify(tanksByLocation[0])).toEqual(JSON.stringify(tank));
        expect(JSON.stringify(tanksByLocation[1])).toEqual(JSON.stringify(tank2));
        expect(tanksByLocation[2]).toBeFalsy();
        expect(JSON.stringify(tanksByStatus[0])).toEqual(JSON.stringify(tank2));
        expect(tanksByStatus[1]).toBeFalsy();
    });
    it("deletes a given tank", async () => {
        await sequelizeTankRepo.delete(newId);
        const shouldBeUndefined = await sequelizeTankRepo.find(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("lists all tanks", async () => {
        const tankList = await sequelizeTankRepo.list();
        expect(tankList[0]).toBeInstanceOf(tank_1.Tank);
        expect(tankList[0].id).toEqual(newId);
        expect(tankList[1].id).toEqual(newId2);
    });
});
