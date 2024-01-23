import { FishSpecie } from "../../../src/entities/fishSpecie";
import { Tank } from "../../../src/entities/tank";
import { FishSpecies, Tanks } from "../../../src/services/database/models";
import { SequelizeFishSpecieRepo } from "../../../src/services/database/sequelize-fishSpecie-repo";
import { SequelizeTankRepo } from "../../../src/services/database/sequelize-tank-repo";

describe("sequelize tank repository", () => {
  const sequelizeFishSpecieRepo = new SequelizeFishSpecieRepo();
  const sequelizeTankRepo = new SequelizeTankRepo();
  let newId: string;
  let newId2: string;
  let specieId: string;
  let tank: Tank;
  let tank2: Tank;

  const specie = new FishSpecie(
    "tilapia",
    "flakes",
    { min: 15, max: 26 },
    { min: 12, max: 19 },
    { min: 5, max: 8 }
  );

  beforeEach(async () => {
    await Tanks.sync({ force: true });
    await FishSpecies.sync({ force: true });

    specieId = await sequelizeFishSpecieRepo.add(specie);

    newId = await sequelizeTankRepo.add(
      (tank = new Tank(specie, "L-2B", "room 2", 45, 1200))
    );

    newId2 = await sequelizeTankRepo.add(
      (tank2 = new Tank(specie, "M-1B", "room 2", 50, 700))
    );
  });

  afterAll(async () => {
    await Tanks.sync({ force: true });
    await FishSpecies.sync({ force: true });
  });

  it("adds a tank to the repository", async () => {
    expect(newId).toBeTruthy();
  });

  it("finds a tank by id", async () => {
    const retrievedTank = await sequelizeTankRepo.find(newId);

    const shouldBeUndefined = await sequelizeTankRepo.find("12345");

    expect(retrievedTank).toBeInstanceOf(Tank);
    expect(retrievedTank?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("finds tanks by a given attribute", async () => {
    const tanksByType = await sequelizeTankRepo.findBy("type", "L-2B");
    const tanksByCapacity = await sequelizeTankRepo.findBy("capacity", 700);
    const tanksByLocation = await sequelizeTankRepo.findBy(
      "location",
      "room 2"
    );
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

    expect(tankList[0]).toBeInstanceOf(Tank);
    expect(tankList[0].id).toEqual(newId);
    expect(tankList[1].id).toEqual(newId2);
  });
});
