import { FishSpecie } from "../../../src/entities/fishSpecie";
import { Tank } from "../../../src/entities/tank";
import { Warning } from "../../../src/entities/warning";
import {
  FishSpecies,
  Tanks,
  Warnings,
} from "../../../src/services/database/models";
import { SequelizeFishSpecieRepo } from "../../../src/services/database/sequelize-fishSpecie-repo";
import { SequelizeTankRepo } from "../../../src/services/database/sequelize-tank-repo";
import { SequelizeWarningRepo } from "../../../src/services/database/sequelize-warning-repo";

describe("sequelize warning repository", () => {
  const sequelizeWarningRepo = new SequelizeWarningRepo();
  const sequelizeFishSpecieRepo = new SequelizeFishSpecieRepo();
  const sequelizeTankRepo = new SequelizeTankRepo();
  let newId: string;
  let newId2: string;
  let specieId: string;
  let tank: Tank;
  let tankId: string;

  const specie = new FishSpecie(
    "tilapia",
    "flakes",
    { min: 15, max: 26 },
    { min: 12, max: 19 },
    { min: 5, max: 8 }
  );

  beforeEach(async () => {
    await FishSpecies.sync({ force: true });
    await Tanks.sync({ force: true });
    await Warnings.sync({ force: true });

    specieId = await sequelizeFishSpecieRepo.add(specie);
    specie.id = specieId;

    tankId = await sequelizeTankRepo.add(
      (tank = new Tank(specie, "L-1A", "room 2", 10, 1000))
    );
    tank.id = tankId;

    newId = await sequelizeWarningRepo.add(
      new Warning(tank, "low oxygen", {
        verification: {
          oxygenOutOfRange: true,
          temperatureOutOfRange: false,
          phOutOfRange: false,
        },
      })
    );

    newId2 = await sequelizeWarningRepo.add(
      new Warning(tank, "low temperature", {
        verification: {
          oxygenOutOfRange: false,
          temperatureOutOfRange: true,
          phOutOfRange: false,
        },
      })
    );
  }, 20000);

  afterAll(async () => {
    await FishSpecies.sync({ force: true });
    await Tanks.sync({ force: true });
    await Warnings.sync({ force: true });
  }, 20000);

  it("adds a warning to the repository", async () => {
    expect(newId).toBeTruthy();
  });

  it("deletes a given warning", async () => {
    await sequelizeWarningRepo.delete(newId);

    expect(
      await sequelizeWarningRepo.add(
        new Warning(
          tank,
          "low oxygen",
          {
            verification: {
              oxygenOutOfRange: true,
              temperatureOutOfRange: false,
              phOutOfRange: false,
            },
          },
          newId
        )
      )
    ).resolves;
  });

  it("lists all warnings", async () => {
    const warningList = await sequelizeWarningRepo.list();

    expect(warningList[0]).toBeInstanceOf(Warning);
    expect(warningList[0].id).toEqual(newId);
    expect(warningList[1].id).toEqual(newId2);
  });
});
