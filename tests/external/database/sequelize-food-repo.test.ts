import { Food } from "../../../src/entities/food";
import { SequelizeFoodRepo } from "../../../src/services/database/sequelize-food-repo";

import { Foods } from "../../../src/services/database/models";
import { BusinessPartner } from "../../../src/entities/businessPartner";

describe("sequelize foods repository", () => {
  const sequelizeFoodRepo = new SequelizeFoodRepo();

  beforeEach(async () => {
    await Foods.sync({ force: true });
  }, 20000);

  afterEach(async () => {
    await Foods.sync({ force: true });
  }, 20000);

  const seller = new BusinessPartner(
    123,
    "company@mail.com",
    "company llc",
    "street 2, 987"
  );

  const food = new Food("flakes", 20, 500.9, new Date("2025-10-10"), seller);
  const food2 = new Food("pallets", 10, 100, new Date("2025-10-10"), seller);

  it("adds a food to the repository", async () => {
    const newId = await sequelizeFoodRepo.add(food);

    expect(newId).toBeTruthy();
  });

  it("finds a food by id", async () => {
    const newId = await sequelizeFoodRepo.add(food);

    const retrievedFood = await sequelizeFoodRepo.find(newId);

    const shouldBeUndefined = await sequelizeFoodRepo.find("12345");

    expect(retrievedFood).toBeInstanceOf(Food);
    expect(retrievedFood?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("updates the storage of a given food", async () => {
    const newId = await sequelizeFoodRepo.add(food);

    const newStorage = 5;
    await sequelizeFoodRepo.updateStorage(newId, newStorage);

    const retrievedFood = await sequelizeFoodRepo.find(newId);
    expect(retrievedFood?.quantity).toEqual(newStorage);
  });

  it("deletes a given food", async () => {
    const newId = await sequelizeFoodRepo.add(food);

    await sequelizeFoodRepo.delete(newId);

    const shouldBeUndefined = await sequelizeFoodRepo.find(newId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all foods", async () => {
    const newId = await sequelizeFoodRepo.add(food);
    const newId2 = await sequelizeFoodRepo.add(food2);

    const foodList = await sequelizeFoodRepo.list();

    expect(foodList[0]).toBeInstanceOf(Food);
    expect(foodList[0].id).toEqual(newId);
    expect(foodList[1].id).toEqual(newId2);
  });
});
