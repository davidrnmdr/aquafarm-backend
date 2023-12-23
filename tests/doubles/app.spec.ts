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
import { WrongTypeError } from "../../src/errors/wrong-type-error";

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
    const tank = new Tank("L-B2", "room 6", 98, 2000);
    const tank1 = new Tank("L-B2", "room 7", 70, 2500);
    const tank2 = new Tank("S-C2", "room 7", 91, 100);
    const tank3 = new Tank("M-A1", "room 1", 91, 3000);
    const tank4 = new Tank("S-C2", "room 9", 37, 3000);

    it("registers a given tank", async () => {
      const newId = await app.registerTank(tank);

      expect(newId).toBeTruthy();
      await expect(app.findTank(newId)).resolves.toMatchObject(tank);
    });

    it("retrieves a list of tanks that matches some given property", async () => {
      await app.registerTank(tank);
      await app.registerTank(tank1);
      await app.registerTank(tank2);
      await app.registerTank(tank3);
      await app.registerTank(tank4);

      const list = await app.findTanksBy("type", "L-B2");
      const list1 = await app.findTanksBy("location", "room 7");
      const list2 = await app.findTanksBy("status", 91);
      const list3 = await app.findTanksBy("capacity", 3000);
      const list4 = await app.findTanksBy("capacity", 999);

      expect(list.includes(tank) && list.includes(tank1)).toBeTruthy();
      expect(list1.includes(tank1) && list1.includes(tank2)).toBeTruthy();
      expect(list2.includes(tank2) && list2.includes(tank3)).toBeTruthy();
      expect(list3.includes(tank3) && list3.includes(tank4)).toBeTruthy();
      expect(list4.length).toEqual(0);
    });

    it("throws WrongTypeError when passing a string when a number is expected and vice versa", async () => {
      await expect(app.findTanksBy("capacity", 10)).resolves.toHaveLength(0);

      await expect(app.findTanksBy("location", 10)).rejects.toThrow(
        WrongTypeError
      );

      await expect(app.findTanksBy("status", "10")).rejects.toThrow(
        WrongTypeError
      );
    });
  });
});
