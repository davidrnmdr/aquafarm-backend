import { Medication } from "../../../src/entities/medication";
import { SequelizeMedicationRepo } from "../../../src/services/database/sequelize-medication-repo";

import {
  BusinessPartners,
  Employees,
  Medications,
  FishSpecies,
  Treatments,
  Tanks,
} from "../../../src/services/database/models";
import { Employee } from "../../../src/entities/employee";
import { Tank } from "../../../src/entities/tank";
import { FishSpecie } from "../../../src/entities/fishSpecie";
import { BusinessPartner } from "../../../src/entities/businessPartner";
import { Treatment } from "../../../src/entities/treatment";
import { SequelizeFishSpecieRepo } from "../../../src/services/database/sequelize-fishSpecie-repo";
import { SequelizeTankRepo } from "../../../src/services/database/sequelize-tank-repo";
import { SequelizeTreatmentRepo } from "../../../src/services/database/sequelize-treatment-repo";
import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";
import { SequelizeEmployeeRepo } from "../../../src/services/database/sequelize-employee-repo";

describe("sequelize medications repository", () => {
  const sequelizeMedicationRepo = new SequelizeMedicationRepo();
  const sequelizeSpecieRepo = new SequelizeFishSpecieRepo();
  const sequelizeTankRepo = new SequelizeTankRepo();
  const sequelizeTreatmentRepo = new SequelizeTreatmentRepo();
  const sequelizeEmployeeRepo = new SequelizeEmployeeRepo();
  const sequelizePartnerRepo = new SequelizeBusinessPartnerRepo();
  let employeeId: string;
  let employeeId2: string;
  let specieId: string;
  let tankId: string;
  let sellerId: string;
  let treatmentId: string;
  let medicationId: string;
  let medicationId2: string;
  let medication: Medication;
  let medication2: Medication;

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

  const treatment = new Treatment(
    "skin med",
    100,
    1299.0,
    new Date("2025-11-11"),
    seller
  );

  beforeEach(async () => {
    await Medications.sync({ force: true });
    await Treatments.sync({ force: true });
    await BusinessPartners.sync({ force: true });
    await Tanks.sync({ force: true });
    await FishSpecies.sync({ force: true });
    await Employees.sync({ force: true });

    employeeId = await sequelizeEmployeeRepo.add(employee);

    employeeId2 = await sequelizeEmployeeRepo.add(employee2);

    specieId = await sequelizeSpecieRepo.add(specie);

    tankId = await sequelizeTankRepo.add(tank);

    sellerId = await sequelizePartnerRepo.add(seller);

    treatmentId = await sequelizeTreatmentRepo.add(treatment);

    medicationId = await sequelizeMedicationRepo.add(
      (medication = new Medication(employee, tank, treatment, 10, new Date()))
    );

    medicationId2 = await sequelizeMedicationRepo.add(
      (medication2 = new Medication(employee2, tank, treatment, 11, new Date()))
    );
  }, 20000);

  afterAll(async () => {
    await Medications.sync({ force: true });
    await Treatments.sync({ force: true });
    await BusinessPartners.sync({ force: true });
    await Tanks.sync({ force: true });
    await FishSpecies.sync({ force: true });
    await Employees.sync({ force: true });
  }, 20000);

  it("adds a medication to the repository", async () => {
    expect(medicationId).toBeTruthy();
  });

  it("finds a medication by id", async () => {
    const retrievedMedication = await sequelizeMedicationRepo.find(
      medicationId
    );

    const shouldBeUndefined = await sequelizeMedicationRepo.find("12345");

    expect(retrievedMedication).toBeInstanceOf(Medication);
    expect(retrievedMedication?.id).toEqual(medicationId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("finds medications by some given employee attribute", async () => {
    const medicationsByEmail = await sequelizeMedicationRepo.findByEmployee(
      "email",
      "david@mail.com"
    );

    const medicationsByName = await sequelizeMedicationRepo.findByEmployee(
      "name",
      "aaron"
    );

    const medicationsByRole = await sequelizeMedicationRepo.findByEmployee(
      "role",
      "president"
    );

    expect(JSON.stringify(medicationsByEmail[0])).toEqual(
      JSON.stringify(medication)
    );
    expect(medicationsByEmail[1]).toBeFalsy();

    expect(JSON.stringify(medicationsByName[0])).toEqual(
      JSON.stringify(medication2)
    );
    expect(medicationsByName[1]).toBeFalsy();

    expect(JSON.stringify(medicationsByRole[0])).toEqual(
      JSON.stringify(medication)
    );
    expect(JSON.stringify(medicationsByRole[1])).toEqual(
      JSON.stringify(medication2)
    );
    expect(medicationsByRole[2]).toBeFalsy();
  }, 10000);

  it("deletes a given medication", async () => {
    await sequelizeMedicationRepo.delete(medicationId);

    const shouldBeUndefined = await sequelizeMedicationRepo.find(medicationId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all medications", async () => {
    const medicationList = await sequelizeMedicationRepo.list();

    expect(medicationList[0]).toBeInstanceOf(Medication);
    expect(medicationList[0].id).toEqual(medicationId);
    expect(medicationList[1].id).toEqual(medicationId2);
  });
});
