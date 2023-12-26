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
import { BusinessPartner } from "../../src/entities/businessPartner";
import { Employee } from "../../src/entities/employee";
import { Food } from "../../src/entities/food";
import { Tank } from "../../src/entities/tank";
import { TankVerification } from "../../src/entities/tankVerification";
import { DuplicatedEmployeeError } from "../../src/errors/duplicate-employee-error";
import { DuplicatePartnerError } from "../../src/errors/duplicate-partner-error";
import { EmployeeNotFoundError } from "../../src/errors/employee-not-found-error";
import { ExpiredFoodError } from "../../src/errors/expired-food-error";
import { FoodNotFoundError } from "../../src/errors/food-not-found-error";
import { InsuficientFoodError } from "../../src/errors/insuficient-food-error";
import { PartnerNotFoundError } from "../../src/errors/partner-not-found-error";
import { UnableToFindError } from "../../src/errors/unable-to-find-error";
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

  describe("register business partner", () => {
    const partner = new BusinessPartner(
      123,
      "company@mail.com",
      "company llc",
      "street 4, 982",
      [],
      []
    );

    it("registers a business partner", async () => {
      const newId = await app.registerBusinessPartner(partner);

      expect(newId).toBeDefined();
      expect(await app.findBusinessPartner(partner.ein)).resolves;
    });

    it("retrieves a business partner", async () => {
      const newId = await app.registerBusinessPartner(partner);

      const retrievedPartner = await app.findBusinessPartner(partner.ein);

      expect(retrievedPartner).toBeInstanceOf(BusinessPartner);
      expect(retrievedPartner.ein).toEqual(partner.ein);
      expect(retrievedPartner.id).toEqual(newId);
    });

    it("throws PartnerNotFoundError when trying to retrieve a partner that is not registered", async () => {
      const newId = await app.registerBusinessPartner(partner);

      await expect(app.findBusinessPartner(456)).rejects.toThrow(
        PartnerNotFoundError
      );
    });

    it("throws DuplicatedPartnerError when trying to register an already registered partner", async () => {
      const newId = await app.registerBusinessPartner(partner);

      await expect(app.registerBusinessPartner(partner)).rejects.toThrow(
        DuplicatePartnerError
      );
    });
  });

  describe("register feeding", () => {
    const tank = new Tank("M-C2", "room 3", 34.5, 1200);
    const employee = new Employee(
      "david",
      "david@mail.com",
      "president",
      "123"
    );
    const partner = new BusinessPartner(
      987,
      "company@mail.com",
      "company llc",
      "street 6, 223",
      [],
      []
    );
    const food = new Food(
      "flakes",
      200,
      999.35,
      new Date("2024-07-16"),
      partner
    );
    it("registers a feeding", async () => {
      const tankId = await app.registerTank(tank);
      const employeeId = await app.registerEmployee(employee);
      const partnerId = await app.registerBusinessPartner(partner);
      const foodId = await app.registerFood(food);

      const newId = await app.registerFeeding(
        tankId,
        employee.email,
        foodId,
        100
      );

      expect(newId).toBeDefined();
      expect(await app.findFeeding(newId)).resolves;
    });

    it("successfully updates the storage of the used food", async () => {
      const tankId = await app.registerTank(tank);
      const employeeId = await app.registerEmployee(employee);
      const partnerId = await app.registerBusinessPartner(partner);
      const foodId = await app.registerFood(food);

      const newId = await app.registerFeeding(
        tankId,
        employee.email,
        foodId,
        100
      );

      const retrievedFeeding = await app.findFeeding(newId);

      expect(retrievedFeeding.quantity).toEqual(100);
    });

    it("throws InsuficientFoodError when trying to register a feeding with a quantity greater than storage", async () => {
      const tankId = await app.registerTank(tank);
      const employeeId = await app.registerEmployee(employee);
      const partnerId = await app.registerBusinessPartner(partner);
      const foodId = await app.registerFood(food);

      await expect(
        app.registerFeeding(tankId, employee.email, foodId, 300)
      ).rejects.toThrow(InsuficientFoodError);
    });

    it("throws ExpiredFoodError when trying to register a feeding with a expired food", async () => {
      const expiredFood = new Food(
        "pallets",
        200,
        1200.9,
        new Date("2022-10-10"),
        partner
      );
      const tankId = await app.registerTank(tank);
      const employeeId = await app.registerEmployee(employee);
      const partnerId = await app.registerBusinessPartner(partner);
      const foodId = await app.registerFood(expiredFood);

      await expect(
        app.registerFeeding(tankId, employee.email, foodId, 100)
      ).rejects.toThrow(ExpiredFoodError);
    });

    it("deletes the food if the quantity hits 0", async () => {
      const tankId = await app.registerTank(tank);
      const employeeId = await app.registerEmployee(employee);
      const partnerId = await app.registerBusinessPartner(partner);
      const foodId = await app.registerFood(food);

      const newId = await app.registerFeeding(
        tankId,
        employee.email,
        foodId,
        100
      );

      await expect(app.findFood(foodId)).rejects.toThrow(FoodNotFoundError);
    });
  });

  describe("retrieves a list of verifications by some employee property", () => {
    const employee = new Employee(
      "david",
      "david@mail.com",
      "president",
      "123"
    );

    const employee2 = new Employee(
      "aaron",
      "aaron@mail.com",
      "president",
      "123"
    );

    const tank = new Tank("L-A1", "room 2", 76, 2300);

    it("returns a list of verifications", async () => {
      const employeeId = await app.registerEmployee(employee);
      const employeeId2 = await app.registerEmployee(employee2);
      const tankId = await app.registerTank(tank);

      const verificationId = await app.registerVerification(
        tankId,
        employee.email,
        23.2,
        12.3,
        7.19
      );

      const verificationId2 = await app.registerVerification(
        tankId,
        employee2.email,
        23.2,
        12.3,
        7.19
      );

      const verificationsByRole = await app.findVerificationsByEmployee(
        "role",
        "president"
      );

      const verificationsByName = await app.findVerificationsByEmployee(
        "name",
        "david"
      );

      const verificationsByEmail = await app.findVerificationsByEmployee(
        "email",
        "aaron@mail.com"
      );

      expect(verificationsByRole).toHaveLength(2);
      expect(verificationsByRole[0].id).toEqual(verificationId);
      expect(verificationsByRole[1].id).toEqual(verificationId2);

      expect(verificationsByName).toHaveLength(1);
      expect(verificationsByName[0].id).toEqual(verificationId);

      expect(verificationsByEmail).toHaveLength(1);
      expect(verificationsByEmail[0].id).toEqual(verificationId2);
    });

    it("throws UnableToFindError when trying to search by a non-existent employee property or that search is empty", async () => {
      const employeeId = await app.registerEmployee(employee);
      const employeeId2 = await app.registerEmployee(employee2);
      const tankId = await app.registerTank(tank);

      const verificationId = await app.registerVerification(
        tankId,
        employee.email,
        23.2,
        12.3,
        7.19
      );

      const verificationId2 = await app.registerVerification(
        tankId,
        employee.email,
        23.2,
        12.3,
        6.19
      );

      await expect(
        app.findVerificationsByEmployee("email", "medeiro@mail.com")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findVerificationsByEmployee("name", "john")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findVerificationsByEmployee("role", "accountant")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findVerificationsByEmployee("email", "aaron@mail.com")
      ).rejects.toThrow(UnableToFindError);
    });
  });
});
