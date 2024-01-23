import { Employee } from "../../../src/entities/employee";
import { FishSpecie } from "../../../src/entities/fishSpecie";
import { Tank } from "../../../src/entities/tank";
import { TankVerification } from "../../../src/entities/tankVerification";
import {
  Employees,
  FishSpecies,
  Tanks,
  Verifications,
} from "../../../src/services/database/models";
import { SequelizeEmployeeRepo } from "../../../src/services/database/sequelize-employee-repo";
import { SequelizeFishSpecieRepo } from "../../../src/services/database/sequelize-fishSpecie-repo";
import { SequelizeTankRepo } from "../../../src/services/database/sequelize-tank-repo";
import { SequelizeTankVerificationRepo } from "../../../src/services/database/sequelize-tankVerification-repo";

describe("sequelize tank verification repository", () => {
  const sequelizeVerificationRepo = new SequelizeTankVerificationRepo();
  const sequelizeSpecieRepo = new SequelizeFishSpecieRepo();
  const sequelizeTankRepo = new SequelizeTankRepo();
  const sequelizeEmployeeRepo = new SequelizeEmployeeRepo();
  let specie: FishSpecie;
  let specieId: string;
  let tank: Tank;
  let tankId: string;
  let employee: Employee;
  let employeeId: string;
  let employee2: Employee;
  let employeeId2: string;
  let verification: TankVerification;
  let newId: string;
  let verification2: TankVerification;
  let newId2: string;

  beforeEach(async () => {
    await FishSpecies.sync({ force: true });
    await Tanks.sync({ force: true });
    await Employees.sync({ force: true });
    await Verifications.sync({ force: true });

    specieId = await sequelizeSpecieRepo.add(
      (specie = new FishSpecie(
        "tilapia",
        "flakes",
        { min: 20, max: 28 },
        { min: 13, max: 22 },
        { min: 5, max: 8 }
      ))
    );
    specie.id = specieId;

    tankId = await sequelizeTankRepo.add(
      (tank = new Tank(specie, "M-2B", "room 1", 40, 900))
    );
    tank.id = tankId;

    employeeId = await sequelizeEmployeeRepo.add(
      (employee = new Employee("david", "david@mail.com", "president", "123"))
    );
    employee.id = employeeId;

    employeeId2 = await sequelizeEmployeeRepo.add(
      (employee2 = new Employee("aaron", "aaron@mail.com", "president", "321"))
    );
    employee2.id = employeeId2;

    newId = await sequelizeVerificationRepo.add(
      (verification = new TankVerification(
        tank,
        employee,
        23,
        15,
        7,
        new Date()
      ))
    );
    verification.id = newId;

    newId2 = await sequelizeVerificationRepo.add(
      (verification2 = new TankVerification(
        tank,
        employee2,
        23,
        15,
        7,
        new Date()
      ))
    );
    verification2.id = newId2;
  }, 20000);

  afterAll(async () => {
    await FishSpecies.sync({ force: true });
    await Tanks.sync({ force: true });
    await Employees.sync({ force: true });
    await Verifications.sync({ force: true });
  }, 20000);

  it("adds a verification to the repository", async () => {
    expect(newId).toBeTruthy();
  });

  it("finds a verification by id", async () => {
    const retrievedVerification = await sequelizeVerificationRepo.find(newId);

    const shouldBeUndefined = await sequelizeVerificationRepo.find("12345");

    expect(retrievedVerification).toBeInstanceOf(TankVerification);
    expect(retrievedVerification?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("finds verifications by some given employee attribute", async () => {
    const verificationsByEmail = await sequelizeVerificationRepo.findByEmployee(
      "email",
      "david@mail.com"
    );

    const verificationsByName = await sequelizeVerificationRepo.findByEmployee(
      "name",
      "aaron"
    );

    const verificationsByRole = await sequelizeVerificationRepo.findByEmployee(
      "role",
      "president"
    );

    expect(JSON.stringify(verificationsByEmail[0])).toEqual(
      JSON.stringify(verification)
    );
    expect(verificationsByEmail[1]).toBeFalsy();

    expect(JSON.stringify(verificationsByName[0])).toEqual(
      JSON.stringify(verification2)
    );
    expect(verificationsByName[1]).toBeFalsy();

    expect(JSON.stringify(verificationsByRole[0])).toEqual(
      JSON.stringify(verification)
    );
    expect(JSON.stringify(verificationsByRole[1])).toEqual(
      JSON.stringify(verification2)
    );
    expect(verificationsByRole[2]).toBeFalsy();
  }, 10000);

  it("deletes a given verification", async () => {
    await sequelizeVerificationRepo.delete(newId);

    const shouldBeUndefined = await sequelizeVerificationRepo.find(newId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all verifications", async () => {
    const verificationList = await sequelizeVerificationRepo.list();

    expect(verificationList[0]).toBeInstanceOf(TankVerification);
    expect(verificationList[0].id).toEqual(newId);
    expect(verificationList[1].id).toEqual(newId2);
  });
});
