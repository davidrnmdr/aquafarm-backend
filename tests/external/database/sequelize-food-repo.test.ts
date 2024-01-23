import { Food } from "../../../src/entities/food";
import { SequelizeFoodRepo } from "../../../src/services/database/sequelize-food-repo";

import { BusinessPartners, Foods } from "../../../src/services/database/models";
import { BusinessPartner } from "../../../src/entities/businessPartner";

import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";

describe("sequelize foods repository", () => {
  const sequelizeFoodRepo = new SequelizeFoodRepo();
  const sequelizePartnerRepo = new SequelizeBusinessPartnerRepo();
  let newId: string;
  let newId2: string;
  let sellerId: string;

  const seller = new BusinessPartner(
    123,
    "company@mail.com",
    "company llc",
    "street 2, 987"
  );

  beforeEach(async () => {
    await Foods.sync({ force: true });
    await BusinessPartners.sync({ force: true });

    sellerId = await sequelizePartnerRepo.add(seller);

    newId = await sequelizeFoodRepo.add(
      new Food("flakes", 20, 500.9, new Date("2025-10-10"), seller)
    );

    newId2 = await sequelizeFoodRepo.add(
      new Food("pallets", 10, 100, new Date("2025-10-10"), seller)
    );
  }, 20000);

  afterAll(async () => {
    await Foods.sync({ force: true });
    await BusinessPartners.sync({ force: true });
  }, 20000);

  it("adds a food to the repository", async () => {
    expect(newId).toBeTruthy();
  });

  it("finds a food by id", async () => {
    const retrievedFood = await sequelizeFoodRepo.find(newId);

    const shouldBeUndefined = await sequelizeFoodRepo.find("12345");

    expect(retrievedFood).toBeInstanceOf(Food);
    expect(retrievedFood?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("updates the storage of a given food", async () => {
    const newStorage = 5;
    await sequelizeFoodRepo.updateStorage(newId, newStorage);

    const retrievedFood = await sequelizeFoodRepo.find(newId);
    expect(retrievedFood?.quantity).toEqual(newStorage);
  });

  it("deletes a given food", async () => {
    await sequelizeFoodRepo.delete(newId);

    const shouldBeUndefined = await sequelizeFoodRepo.find(newId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all foods", async () => {
    const foodList = await sequelizeFoodRepo.list();

    expect(foodList[0]).toBeInstanceOf(Food);
    expect(foodList[0].id).toEqual(newId);
    expect(foodList[1].id).toEqual(newId2);
  });
});
