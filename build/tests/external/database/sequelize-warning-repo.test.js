"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fishSpecie_1 = require("../../../src/entities/fishSpecie");
const tank_1 = require("../../../src/entities/tank");
const warning_1 = require("../../../src/entities/warning");
const models_1 = require("../../../src/services/database/models");
const sequelize_fishSpecie_repo_1 = require("../../../src/services/database/sequelize-fishSpecie-repo");
const sequelize_tank_repo_1 = require("../../../src/services/database/sequelize-tank-repo");
const sequelize_warning_repo_1 = require("../../../src/services/database/sequelize-warning-repo");
describe("sequelize warning repository", () => {
    const sequelizeWarningRepo = new sequelize_warning_repo_1.SequelizeWarningRepo();
    const sequelizeFishSpecieRepo = new sequelize_fishSpecie_repo_1.SequelizeFishSpecieRepo();
    const sequelizeTankRepo = new sequelize_tank_repo_1.SequelizeTankRepo();
    let newId;
    let newId2;
    let specieId;
    let tank;
    let tankId;
    const specie = new fishSpecie_1.FishSpecie("tilapia", "flakes", { min: 15, max: 26 }, { min: 12, max: 19 }, { min: 5, max: 8 });
    beforeEach(async () => {
        await models_1.FishSpecies.sync({ force: true });
        await models_1.Tanks.sync({ force: true });
        await models_1.Warnings.sync({ force: true });
        specieId = await sequelizeFishSpecieRepo.add(specie);
        tankId = await sequelizeTankRepo.add((tank = new tank_1.Tank(specie, "L-1A", "room 2", 10, 1000)));
        newId = await sequelizeWarningRepo.add(new warning_1.Warning(tank, "low oxygen", {
            verification: {
                oxygenOutOfRange: true,
                temperatureOutOfRange: false,
                phOutOfRange: false,
            },
        }));
        newId2 = await sequelizeWarningRepo.add(new warning_1.Warning(tank, "low temperature", {
            verification: {
                oxygenOutOfRange: false,
                temperatureOutOfRange: true,
                phOutOfRange: false,
            },
        }));
    }, 20000);
    afterAll(async () => {
        await models_1.FishSpecies.sync({ force: true });
        await models_1.Tanks.sync({ force: true });
        await models_1.Warnings.sync({ force: true });
    }, 20000);
    it("adds a warning to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("deletes a given warning", async () => {
        await sequelizeWarningRepo.delete(newId);
        expect(await sequelizeWarningRepo.add(new warning_1.Warning(tank, "low oxygen", {
            verification: {
                oxygenOutOfRange: true,
                temperatureOutOfRange: false,
                phOutOfRange: false,
            },
        }, newId))).resolves;
    });
    it("lists all warnings", async () => {
        const warningList = await sequelizeWarningRepo.list();
        expect(warningList[0]).toBeInstanceOf(warning_1.Warning);
        expect(warningList[0].id).toEqual(newId);
        expect(warningList[1].id).toEqual(newId2);
    });
});
