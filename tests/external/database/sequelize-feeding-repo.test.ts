import { Feeding } from "../../../src/entities/feeding";
import { SequelizeFeedingRepo } from "../../../src/services/database/sequelize-feeding-repo";

import {
  BusinessPartners,
  Employees,
  Feedings,
  FishSpecies,
  Foods,
  Tanks,
} from "../../../src/services/database/models";
import { Employee } from "../../../src/entities/employee";
import { Tank } from "../../../src/entities/tank";
import { FishSpecie } from "../../../src/entities/fishSpecie";
import { BusinessPartner } from "../../../src/entities/businessPartner";
import { Food } from "../../../src/entities/food";
import { SequelizeFishSpecieRepo } from "../../../src/services/database/sequelize-fishSpecie-repo";
import { SequelizeTankRepo } from "../../../src/services/database/sequelize-tank-repo";
import { SequelizeFoodRepo } from "../../../src/services/database/sequelize-food-repo";
import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";
import { SequelizeEmployeeRepo } from "../../../src/services/database/sequelize-employee-repo";

describe("sequelize feedings repository", () => {
  const sequelizeFeedingRepo = new SequelizeFeedingRepo();
  const sequelizeSpecieRepo = new SequelizeFishSpecieRepo();
  const sequelizeTankRepo = new SequelizeTankRepo();
  const sequelizeFoodRepo = new SequelizeFoodRepo();
  const sequelizeEmployeeRepo = new SequelizeEmployeeRepo();
  const sequelizePartnerRepo = new SequelizeBusinessPartnerRepo();
  let employeeId: string;
  let employeeId2: string;
  let specieId: string;
  let tankId: string;
  let sellerId: string;
  let foodId: string;
  let feedingId: string;
  let feedingId2: string;
  let feeding: Feeding;
  let feeding2: Feeding;

  const specie = new FishSpecie(
    "tilapia",
    "flakes",
    { min: 20, max: 28 },
    { min: 13, max: 22 },
    { min: 5, max: 8 }
  );

  const tank = new Tank(specie, "L-A2", "room 2", 45, 1300);

  const employee = new Employee("david", "david@mail.com", "president", "123");
  const employee2 = new Employee("aaron", "aaron@mail.com", "president", "123");

  const seller = new BusinessPartner(
    123,
    "company@mail.com",
    "company llc",
    "street 6, 311"
  );

  const food = new Food("flakes", 100, 1299.0, new Date("2025-11-11"), seller);

  beforeEach(async () => {
    await Feedings.sync({ force: true });
    await Foods.sync({ force: true });
    await BusinessPartners.sync({ force: true });
    await Tanks.sync({ force: true });
    await FishSpecies.sync({ force: true });
    await Employees.sync({ force: true });

    employeeId = await sequelizeEmployeeRepo.add(employee);
    employee.id = employeeId;

    employeeId2 = await sequelizeEmployeeRepo.add(employee2);
    employee2.id = employeeId2;

    specieId = await sequelizeSpecieRepo.add(specie);
    specie.id = specieId;

    tankId = await sequelizeTankRepo.add(tank);
    tank.id = tankId;

    sellerId = await sequelizePartnerRepo.add(seller);
    seller.id = sellerId;

    foodId = await sequelizeFoodRepo.add(food);
    food.id = foodId;

    feedingId = await sequelizeFeedingRepo.add(
      (feeding = new Feeding(employee, tank, food, 10, new Date()))
    );
    feeding.id = feedingId;

    feedingId2 = await sequelizeFeedingRepo.add(
      (feeding2 = new Feeding(employee2, tank, food, 11, new Date()))
    );
    feeding2.id = feedingId2;
  }, 20000);

  afterEach(async () => {
    await Feedings.sync({ force: true });
    await Foods.sync({ force: true });
    await BusinessPartners.sync({ force: true });
    await Tanks.sync({ force: true });
    await FishSpecies.sync({ force: true });
    await Employees.sync({ force: true });
  }, 20000);

  it("adds a feeding to the repository", async () => {
    expect(feedingId).toBeTruthy();
  });

  it("finds a feeding by id", async () => {
    const retrievedFeeding = await sequelizeFeedingRepo.find(feedingId);

    const shouldBeUndefined = await sequelizeFeedingRepo.find("12345");

    expect(retrievedFeeding).toBeInstanceOf(Feeding);
    expect(retrievedFeeding?.id).toEqual(feedingId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("finds feedings by some given employee attribute", async () => {
    const feedingsByEmail = await sequelizeFeedingRepo.findByEmployee(
      "email",
      "david@mail.com"
    );

    const feedingsByName = await sequelizeFeedingRepo.findByEmployee(
      "name",
      "aaron"
    );

    const feedingsByRole = await sequelizeFeedingRepo.findByEmployee(
      "role",
      "president"
    );

    expect(JSON.stringify(feedingsByEmail[0])).toEqual(JSON.stringify(feeding));
    expect(feedingsByEmail[1]).toBeFalsy();

    expect(JSON.stringify(feedingsByName[0])).toEqual(JSON.stringify(feeding2));
    expect(feedingsByName[1]).toBeFalsy();

    expect(JSON.stringify(feedingsByRole[0])).toEqual(JSON.stringify(feeding));
    expect(JSON.stringify(feedingsByRole[1])).toEqual(JSON.stringify(feeding2));
    expect(feedingsByRole[2]).toBeFalsy();
  }, 10000);

  it("deletes a given feeding", async () => {
    await sequelizeFeedingRepo.delete(feedingId);

    const shouldBeUndefined = await sequelizeFeedingRepo.find(feedingId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all feedings", async () => {
    const feedingList = await sequelizeFeedingRepo.list();

    expect(feedingList[0]).toBeInstanceOf(Feeding);
    expect(feedingList[0].id).toEqual(feedingId);
    expect(feedingList[1].id).toEqual(feedingId2);
  });
});
