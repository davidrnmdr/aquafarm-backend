import { App } from "../../src/app";

import { FakeBusinessPartnerRepo } from "../../src/doubles/fake-businessPartner-repo";
import { FakeEmployeeRepo } from "../../src/doubles/fake-employee-repo";
import { FakeEquipmentRepo } from "../../src/doubles/fake-equipment-repo";
import { FakeFeedingRepo } from "../../src/doubles/fake-feeding-repo";
import { FakeFoodRepo } from "../../src/doubles/fake-food-repo";
import { FakeMaintenanceRepo } from "../../src/doubles/fake-maintenance-repo";
import { FakeTankRepo } from "../../src/doubles/fake-tank-repo";
import { FakeTankVerificationRepo } from "../../src/doubles/fake-tankVerification-repo";
import { FakeTransactionRepo } from "../../src/doubles/fake-transaction-repo";
import { FakeTreatmentRepo } from "../../src/doubles/fake-treatment-repo";
import { Employee } from "../../src/entities/employee";
import { Tank } from "../../src/entities/tank";
import { DuplicatedEmployeeError } from "../../src/errors/duplicate-employee-error";
import { EmployeeNotFoundError } from "../../src/errors/employee-not-found-error";

let app: App;

describe("app using fake repositories", () => {
  beforeEach(() => {
    app = new App(
      new FakeBusinessPartnerRepo(),
      new FakeEmployeeRepo(),
      new FakeEquipmentRepo(),
      new FakeFeedingRepo(),
      new FakeFoodRepo(),
      new FakeMaintenanceRepo(),
      new FakeTankRepo(),
      new FakeTankVerificationRepo(),
      new FakeTransactionRepo(),
      new FakeTreatmentRepo()
    );
  });

  describe("register employee", () => {
    const employee = new Employee(
      "david",
      "david@mail.com",
      "president",
      "123"
    );

    it("registers an employee", async () => {
      const newId = await app.registerEmployee(employee);

      expect(newId).toBeTruthy();
      await expect(app.findEmployee(employee.email)).resolves.toMatchObject(
        employee
      );
    });

    it("throws DuplicateEmployeeError when trying to register an already registered employee", async () => {
      const newId = await app.registerEmployee(employee);

      await expect(app.registerEmployee(employee)).rejects.toThrow(
        DuplicatedEmployeeError
      );
    });
  });

  describe("find employee", () => {
    const employee = new Employee(
      "david",
      "david@mail.com",
      "president",
      "123"
    );

    it("finds an employee by email", async () => {
      const newId = await app.registerEmployee(employee);

      const retrievedEmployee = await app.findEmployee(employee.email);

      expect(retrievedEmployee).toBeDefined();
      expect(retrievedEmployee.email).toEqual(employee.email);
      expect(retrievedEmployee.id).toEqual(newId);
    });

    it("throws EmployeeNotFoundError when trying to find an employee that is not registered", async () => {
      await expect(app.findEmployee(employee.email)).rejects.toThrow(
        EmployeeNotFoundError
      );
    });
  });

  describe("register tank", () => {
    const tankToBeAdded = new Tank("L-B2", "room 6", 98, 2000);

    it("registers a given tank", async () => {});
  });
});
