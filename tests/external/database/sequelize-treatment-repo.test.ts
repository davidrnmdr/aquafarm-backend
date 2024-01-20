import { Treatment } from "../../../src/entities/treatment";
import { SequelizeTreatmentRepo } from "../../../src/services/database/sequelize-treatment-repo";

import {
  BusinessPartners,
  Treatments,
} from "../../../src/services/database/models";
import { BusinessPartner } from "../../../src/entities/businessPartner";

import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";

describe("sequelize foods repository", () => {
  const sequelizeTreatmentRepo = new SequelizeTreatmentRepo();
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
    await Treatments.sync({ force: true });
    await BusinessPartners.sync({ force: true });

    sellerId = await sequelizePartnerRepo.add(seller);
    seller.id = sellerId;

    newId = await sequelizeTreatmentRepo.add(
      new Treatment("skin med", 20, 500.9, new Date("2025-10-10"), seller)
    );

    newId2 = await sequelizeTreatmentRepo.add(
      new Treatment("skin med 2", 10, 100, new Date("2025-10-10"), seller)
    );
  }, 20000);

  afterAll(async () => {
    await Treatments.sync({ force: true });
    await BusinessPartners.sync({ force: true });
  }, 20000);

  it("adds a treatment to the repository", async () => {
    expect(newId).toBeTruthy();
  });

  it("finds a treatment by id", async () => {
    const retrievedTreatment = await sequelizeTreatmentRepo.find(newId);

    const shouldBeUndefined = await sequelizeTreatmentRepo.find("12345");

    expect(retrievedTreatment).toBeInstanceOf(Treatment);
    expect(retrievedTreatment?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("updates the storage of a given treatment", async () => {
    const newStorage = 5;
    await sequelizeTreatmentRepo.updateStorage(newId, newStorage);

    const retrievedFood = await sequelizeTreatmentRepo.find(newId);
    expect(retrievedFood?.quantity).toEqual(newStorage);
  });

  it("deletes a given treatment", async () => {
    await sequelizeTreatmentRepo.delete(newId);

    const shouldBeUndefined = await sequelizeTreatmentRepo.find(newId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all foods", async () => {
    const foodList = await sequelizeTreatmentRepo.list();

    expect(foodList[0]).toBeInstanceOf(Treatment);
    expect(foodList[0].id).toEqual(newId);
    expect(foodList[1].id).toEqual(newId2);
  });
});
