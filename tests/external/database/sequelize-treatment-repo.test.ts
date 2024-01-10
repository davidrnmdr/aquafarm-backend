import { Treatment } from "../../../src/entities/treatment";
import { SequelizeTreatmentRepo } from "../../../src/services/database/sequelize-treatment-repo";

import { Treatments } from "../../../src/services/database/models";
import { BusinessPartner } from "../../../src/entities/businessPartner";

describe("sequelize treatments repository", () => {
  const sequelizeTreatmentRepo = new SequelizeTreatmentRepo();

  beforeEach(async () => {
    await Treatments.sync({ force: true });
  }, 20000);

  afterEach(async () => {
    await Treatments.sync({ force: true });
  }, 20000);

  const seller = new BusinessPartner(
    123,
    "company@mail.com",
    "company llc",
    "street 2, 987"
  );

  const treatment = new Treatment(
    "skin med",
    20,
    500.9,
    new Date("2025-10-10"),
    seller
  );
  const treatment2 = new Treatment(
    "respiratory med",
    10,
    100,
    new Date("2025-10-10"),
    seller
  );

  it("adds a treatment to the repository", async () => {
    const newId = await sequelizeTreatmentRepo.add(treatment);

    expect(newId).toBeTruthy();
  });

  it("finds a treatment by id", async () => {
    const newId = await sequelizeTreatmentRepo.add(treatment);

    const retrievedTreatment = await sequelizeTreatmentRepo.find(newId);

    const shouldBeUndefined = await sequelizeTreatmentRepo.find("12345");

    expect(retrievedTreatment).toBeInstanceOf(Treatment);
    expect(retrievedTreatment?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("updates the storage of a given treatment", async () => {
    const newId = await sequelizeTreatmentRepo.add(treatment);

    const newStorage = 5;
    await sequelizeTreatmentRepo.updateStorage(newId, newStorage);

    const retrievedTreatment = await sequelizeTreatmentRepo.find(newId);
    expect(retrievedTreatment?.quantity).toEqual(newStorage);
  });

  it("deletes a given treatment", async () => {
    const newId = await sequelizeTreatmentRepo.add(treatment);

    await sequelizeTreatmentRepo.delete(newId);

    const shouldBeUndefined = await sequelizeTreatmentRepo.find(newId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all treatments", async () => {
    const newId = await sequelizeTreatmentRepo.add(treatment);
    const newId2 = await sequelizeTreatmentRepo.add(treatment2);

    const treatmentList = await sequelizeTreatmentRepo.list();

    expect(treatmentList[0]).toBeInstanceOf(Treatment);
    expect(treatmentList[0].id).toEqual(newId);
    expect(treatmentList[1].id).toEqual(newId2);
  });
});
