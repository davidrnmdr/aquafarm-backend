import { App } from "../../src/app";

import { FakeBusinessPartnerRepo } from "../../src/doubles/fake-businessPartner-repo";
import { FakeEmployeeRepo } from "../../src/doubles/fake-employee-repo";
import { FakeEquipmentRepo } from "../../src/doubles/fake-equipment-repo";
import { FakeFeedingRepo } from "../../src/doubles/fake-feeding-repo";
import { FakeFoodRepo } from "../../src/doubles/fake-food-repo";
import { FakeMaintenanceRepo } from "../../src/doubles/fake-maintenance-repo";
import { FakeMedicationRepo } from "../../src/doubles/fake-medication-repo";
import { FakeTankRepo } from "../../src/doubles/fake-tank-repo";
import { FakeTankVerificationRepo } from "../../src/doubles/fake-tankVerification-repo";
import { FakeTransactionRepo } from "../../src/doubles/fake-transaction-repo";
import { FakeTreatmentRepo } from "../../src/doubles/fake-treatment-repo";
import { BusinessPartner } from "../../src/entities/businessPartner";
import { Employee } from "../../src/entities/employee";
import { Equipment } from "../../src/entities/equipment";
import { Food } from "../../src/entities/food";
import { Tank } from "../../src/entities/tank";
import { Treatment } from "../../src/entities/treatment";
import { DuplicatedEmployeeError } from "../../src/errors/duplicate-employee-error";
import { DuplicatePartnerError } from "../../src/errors/duplicate-partner-error";
import { EmployeeNotFoundError } from "../../src/errors/employee-not-found-error";
import { ExpiredFoodError } from "../../src/errors/expired-food-error";
import { ExpiredTreatmentError } from "../../src/errors/expired-treatment-error";
import { FoodNotFoundError } from "../../src/errors/food-not-found-error";
import { InsuficientFoodError } from "../../src/errors/insuficient-food-error";
import { InsuficientPermissionError } from "../../src/errors/insuficient-permission-error";
import { InsuficientTreatmentError } from "../../src/errors/insuficient-treatment-error";
import { InvalidInputError } from "../../src/errors/invalid-input-error";
import { PartnerNotFoundError } from "../../src/errors/partner-not-found-error";
import { TankNotFoundError } from "../../src/errors/tank-not-found-error";
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
      new FakeTreatmentRepo(),
      new FakeMedicationRepo()
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
      await app.registerEmployee(employee);

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

  describe("register food", () => {
    const partner = new BusinessPartner(
      123,
      "company@mail.com",
      "company llc",
      "street 6, 878"
    );

    const food = new Food(
      "flakes",
      110,
      1450.99,
      new Date("2024-11-11"),
      partner
    );

    const food2 = new Food(
      "flakes",
      11,
      1450.99,
      new Date("2023-11-11"),
      partner
    );

    it("registers a given food", async () => {
      await app.registerBusinessPartner(partner);
      const newId = await app.registerFood(food);

      expect(newId).toBeTruthy();
      await expect(app.findFood(newId)).resolves.toMatchObject(food);
    });

    it("throws InvalidInputError when trying to register a food with wrong parameters", async () => {
      await app.registerBusinessPartner(partner);

      await expect(app.registerFood(food2)).rejects.toThrow(InvalidInputError);
    });
  });

  describe("register treatment", () => {
    const partner = new BusinessPartner(
      123,
      "company@mail.com",
      "company llc",
      "street 6, 878"
    );

    const treatment = new Treatment(
      "skin med",
      12,
      998.1,
      new Date("2024-11-11"),
      partner
    );

    const treatment2 = new Treatment(
      "skin med",
      0,
      998.1,
      new Date("2024-11-11"),
      partner
    );

    it("registers a given treatment", async () => {
      await app.registerBusinessPartner(partner);
      const newId = await app.registerTreatment(treatment);

      expect(newId).toBeTruthy();
      await expect(app.findTreatment(newId)).resolves.toMatchObject(treatment);
    });

    it("throws InvalidInputError when trying to register a treatment with wrong parameters", async () => {
      await app.registerBusinessPartner(partner);
      await expect(app.registerTreatment(treatment2)).rejects.toThrow(
        InvalidInputError
      );
    });
  });

  describe("register equipment", () => {
    const partner = new BusinessPartner(
      123,
      "company@mail.com",
      "company llc",
      "street 6, 878"
    );

    const equipment1 = new Equipment(
      "oxygen bomb",
      "ok",
      "room 4",
      partner,
      0,
      1229,
      1
    );

    const equipment2 = new Equipment(
      "oxygen bomb",
      "ok",
      "room 4",
      partner,
      10,
      1229,
      1
    );

    it("registers a given equipment", async () => {
      await app.registerBusinessPartner(partner);
      const newId = await app.registerEquipment(equipment1);

      expect(newId).toBeTruthy();
      await expect(app.findEquipment(newId)).resolves.toMatchObject(equipment1);
    });

    it("throws InvalidInputError when trying to register a equipment with wrong parameters", async () => {
      await app.registerBusinessPartner(partner);

      await expect(app.registerEquipment(equipment2)).rejects.toThrow(
        InvalidInputError
      );
    });
  });

  describe("register tank", () => {
    const tank = new Tank("L-B2", "room 6", 98, 2000);
    const tank1 = new Tank("L-B2", "room 7", 70, 2500);
    const tank2 = new Tank("S-C2", "room 7", 91, 100);
    const tank3 = new Tank("M-A1", "room 1", 91, 3000);
    const tank4 = new Tank("S-C2", "room 9", 37, 3000);
    const tank5 = new Tank("S-C2", "room 9", -9, 3000);
    const tank6 = new Tank("S-C2", "room 9", 90, -2000);

    it("registers a given tank", async () => {
      const newId = await app.registerTank(tank);

      expect(newId).toBeTruthy();
      await expect(app.findTank(newId)).resolves.toMatchObject(tank);
    });

    it("throws InvalidInputError when trying to register a tank with negative or 0 capacity/status", async () => {
      await expect(app.registerTank(tank5)).rejects.toThrow(InvalidInputError);
      await expect(app.registerTank(tank6)).rejects.toThrow(InvalidInputError);
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

    it("throws TankNotFound when trying to retrieve a non-registered tank", async () => {
      await app.registerTank(tank);

      await expect(app.findTank("987")).rejects.toThrow(TankNotFoundError);
    });
  });

  describe("register business partner", () => {
    const partner = new BusinessPartner(
      123,
      "company@mail.com",
      "company llc",
      "street 4, 982"
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
      await app.registerBusinessPartner(partner);

      await expect(app.findBusinessPartner(456)).rejects.toThrow(
        PartnerNotFoundError
      );
    });

    it("throws DuplicatedPartnerError when trying to register an already registered partner", async () => {
      await app.registerBusinessPartner(partner);

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
      "street 6, 223"
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
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
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
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
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
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
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
        new Date("2024-11-11"),
        partner
      );
      const tankId = await app.registerTank(tank);
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
      const foodId = await app.registerFood(expiredFood);
      expiredFood.expirationDate = new Date("2022-11-11");

      await expect(
        app.registerFeeding(tankId, employee.email, foodId, 100)
      ).rejects.toThrow(ExpiredFoodError);
    });

    it("deletes the food if the quantity hits 0", async () => {
      const tankId = await app.registerTank(tank);
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
      const foodId = await app.registerFood(food);

      await app.registerFeeding(tankId, employee.email, foodId, 100);

      await expect(app.findFood(foodId)).rejects.toThrow(FoodNotFoundError);
    });
  });

  describe("register medication", () => {
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
      "street 6, 223"
    );
    const treatment = new Treatment(
      "skin med",
      300,
      15200.9,
      new Date("2024-10-10"),
      partner
    );
    it("registers a medication", async () => {
      const tankId = await app.registerTank(tank);
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
      const treatmentId = await app.registerTreatment(treatment);

      const newId = await app.registerMedication(
        tankId,
        employee.email,
        treatmentId,
        10
      );

      expect(newId).toBeDefined();
      expect(await app.findMedication(newId)).resolves;
    });

    it("successfully updates the storage of the used treatment", async () => {
      const tankId = await app.registerTank(tank);
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
      const treatmentId = await app.registerTreatment(treatment);

      await app.registerMedication(tankId, employee.email, treatmentId, 10);

      const retrievedTreatment = await app.findTreatment(treatmentId);

      expect(retrievedTreatment.quantity).toEqual(280);
    });

    it("throws InsuficientTreatmentError when trying to register a medication with a quantity greater than storage", async () => {
      const tankId = await app.registerTank(tank);
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
      const treatmentId = await app.registerTreatment(treatment);

      await expect(
        app.registerMedication(tankId, employee.email, treatmentId, 300)
      ).rejects.toThrow(InsuficientTreatmentError);
    });

    it("throws ExpiredTreatmentError when trying to register a medication with a expired treatment", async () => {
      const expiredTreatment = new Treatment(
        "skin med",
        500,
        20000.9,
        new Date("2022-10-10"),
        partner
      );
      const tankId = await app.registerTank(tank);
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
      const TreatmentId = await app.registerTreatment(expiredTreatment);

      await expect(
        app.registerMedication(tankId, employee.email, TreatmentId, 100)
      ).rejects.toThrow(ExpiredTreatmentError);
    });

    it("deletes the treatment if the quantity hits 0", async () => {
      const tankId = await app.registerTank(tank);
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);
      const treatmentId = await app.registerTreatment(treatment);

      await app.registerMedication(tankId, employee.email, treatmentId, 280);

      await expect(app.findTreatment(treatmentId)).rejects.toThrow(
        FoodNotFoundError
      );
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

    it("throws InvalidInputError when trying to register a verification with oxygen < 0 or ph < 0 or ph > 14", async () => {
      await app.registerEmployee(employee);
      const tankId = await app.registerTank(tank);

      await expect(
        app.registerVerification(tankId, employee.email, 12, 2, 20)
      ).rejects.toThrow(InvalidInputError);

      await expect(
        app.registerVerification(tankId, employee.email, 12, -4, 7)
      ).rejects.toThrow(InvalidInputError);

      await expect(
        app.registerVerification(tankId, employee.email, 12, -4, 15)
      ).rejects.toThrow(InvalidInputError);
    });

    it("returns a list of verifications", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
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
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      const tankId = await app.registerTank(tank);

      await app.registerVerification(tankId, employee.email, 23.2, 12.3, 7.19);

      await app.registerVerification(tankId, employee.email, 23.2, 12.3, 6.19);

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

  describe("retrieves a list of feedings by some employee property", () => {
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

    const seller = new BusinessPartner(
      987,
      "company@mail.com",
      "company llc",
      "street 4, 873"
    );

    const food = new Food(
      "flakes",
      200,
      1000.99,
      new Date("2024-10-10"),
      seller
    );

    it("throws InvalidInputError when trying to register a feeding with negative quantity", async () => {
      await app.registerEmployee(employee);
      const tankId = await app.registerTank(tank);
      await app.registerBusinessPartner(seller);
      const foodId = await app.registerFood(food);

      await expect(
        app.registerFeeding(tankId, employee.email, foodId, -10)
      ).rejects.toThrow(InvalidInputError);
    });

    it("returns a list of feedings", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      const tankId = await app.registerTank(tank);
      await app.registerBusinessPartner(seller);
      const foodId = await app.registerFood(food);

      const feedingId = await app.registerFeeding(
        tankId,
        employee.email,
        foodId,
        50
      );

      const feedingId2 = await app.registerFeeding(
        tankId,
        employee2.email,
        foodId,
        50
      );

      const feedingsByRole = await app.findFeedingsByEmployee(
        "role",
        "president"
      );

      const feedingsByName = await app.findFeedingsByEmployee("name", "david");

      const feedingsByEmail = await app.findFeedingsByEmployee(
        "email",
        "aaron@mail.com"
      );

      expect(feedingsByRole).toHaveLength(2);
      expect(feedingsByRole[0].id).toEqual(feedingId);
      expect(feedingsByRole[1].id).toEqual(feedingId2);

      expect(feedingsByName).toHaveLength(1);
      expect(feedingsByName[0].id).toEqual(feedingId);

      expect(feedingsByEmail).toHaveLength(1);
      expect(feedingsByEmail[0].id).toEqual(feedingId2);
    });

    it("throws UnableToFindError when trying to search by a non-existent employee property or that search is empty", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      const tankId = await app.registerTank(tank);
      await app.registerBusinessPartner(seller);
      const foodId = await app.registerFood(food);

      await app.registerFeeding(tankId, employee.email, foodId, 50);

      await app.registerFeeding(tankId, employee.email, foodId, 50);

      await expect(
        app.findFeedingsByEmployee("email", "medeiro@mail.com")
      ).rejects.toThrow(UnableToFindError);

      await expect(app.findFeedingsByEmployee("name", "john")).rejects.toThrow(
        UnableToFindError
      );

      await expect(
        app.findFeedingsByEmployee("role", "accountant")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findFeedingsByEmployee("email", "aaron@mail.com")
      ).rejects.toThrow(UnableToFindError);
    });
  });

  describe("retrieves a list of sales by some employee property", () => {
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

    const partner = new BusinessPartner(
      987,
      "company@mail.com",
      "company llc",
      "street 4, 873"
    );

    it("throws InvalidInputError when trying to register a sale with value < 0 or quantity < 0", async () => {
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(partner);

      await expect(
        app.registerSale(-10, partner.ein, 100, employee.email)
      ).rejects.toThrow(InvalidInputError);

      await expect(
        app.registerSale(-10, partner.ein, -100, employee.email)
      ).rejects.toThrow(InvalidInputError);

      await expect(
        app.registerSale(10, partner.ein, -100, employee.email)
      ).rejects.toThrow(InvalidInputError);
    });

    it("returns a list of sales", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      await app.registerBusinessPartner(partner);

      const saleId = await app.registerSale(
        2300.99,
        partner.ein,
        500,
        employee.email
      );

      const saleId2 = await app.registerSale(
        2300.99,
        partner.ein,
        500,
        employee2.email
      );

      const salesByRole = await app.findSalesByEmployee("role", "president");

      const salesByName = await app.findSalesByEmployee("name", "david");

      const salesByEmail = await app.findSalesByEmployee(
        "email",
        "aaron@mail.com"
      );

      expect(salesByRole).toHaveLength(2);
      expect(salesByRole[0].id).toEqual(saleId);
      expect(salesByRole[1].id).toEqual(saleId2);

      expect(salesByName).toHaveLength(1);
      expect(salesByName[0].id).toEqual(saleId);

      expect(salesByEmail).toHaveLength(1);
      expect(salesByEmail[0].id).toEqual(saleId2);
    });

    it("throws UnableToFindError when trying to search by a non-existent employee property or that search is empty", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      await app.registerBusinessPartner(partner);

      await app.registerSale(2300.99, partner.ein, 500, employee.email);

      await app.registerSale(2300.99, partner.ein, 500, employee.email);

      await expect(
        app.findSalesByEmployee("email", "medeiro@mail.com")
      ).rejects.toThrow(UnableToFindError);

      await expect(app.findSalesByEmployee("name", "john")).rejects.toThrow(
        UnableToFindError
      );

      await expect(
        app.findSalesByEmployee("role", "accountant")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findSalesByEmployee("email", "aaron@mail.com")
      ).rejects.toThrow(UnableToFindError);
    });
  });

  describe("retrieves a list of purchases by some employee property", () => {
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

    const employee3 = new Employee(
      "medeiro",
      "medeiro@mail.com",
      "technician",
      "123"
    );

    const partner = new BusinessPartner(
      987,
      "company@mail.com",
      "company llc",
      "street 4, 873"
    );

    const equipment = new Equipment(
      "hammer",
      "new",
      "tools room",
      partner,
      0,
      14.2,
      2
    );

    new Equipment("hammer", "new", "tools room", partner, 0, 14.2, -22);

    const food = new Food(
      "flakes",
      300,
      2998.65,
      new Date("2024-1010"),
      partner
    );

    new Food("flakes", -20, 2998.65, new Date("2024-1010"), partner);

    const treatment = new Treatment(
      "skin med",
      100,
      3499.75,
      new Date("2025-1010"),
      partner
    );

    new Treatment("skin med", -45, 3499.75, new Date("2025-1010"), partner);

    it("throws InsuficientPermissionError when a non-manager tries to register a purchase with divergent values", async () => {
      await app.registerEmployee(employee3);
      await app.registerBusinessPartner(partner);
      const equipmentId = await app.registerEquipment(equipment);

      const foodId = await app.registerFood(food);
      const treatmentId = await app.registerTreatment(treatment);

      await expect(
        app.registerPurchase(
          3500,
          partner.ein,
          null,
          treatmentId,
          equipmentId,
          employee3.email
        )
      ).rejects.toThrow(InsuficientPermissionError);

      await expect(
        app.registerPurchase(
          3000,
          partner.ein,
          foodId,
          null,
          null,
          employee3.email
        )
      ).rejects.toThrow(InsuficientPermissionError);

      await expect(
        app.registerPurchase(
          6500.0,
          partner.ein,
          foodId,
          treatmentId,
          equipmentId,
          employee3.email
        )
      ).rejects.toThrow(InsuficientPermissionError);
    });

    it("returns a list of purchases", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      await app.registerBusinessPartner(partner);
      const equipmentId = await app.registerEquipment(equipment);
      const foodId = await app.registerFood(food);
      const treatmentId = await app.registerTreatment(treatment);

      const purchaseId = await app.registerPurchase(
        6498.4,
        partner.ein,
        foodId,
        treatmentId,
        equipmentId,
        employee.email
      );

      const purchaseId2 = await app.registerPurchase(
        6498.4,
        partner.ein,
        foodId,
        treatmentId,
        equipmentId,
        employee2.email
      );

      const purchasesByRole = await app.findPurchasesByEmployee(
        "role",
        "president"
      );

      const purchasesByName = await app.findPurchasesByEmployee(
        "name",
        "david"
      );

      const purchasesByEmail = await app.findPurchasesByEmployee(
        "email",
        "aaron@mail.com"
      );

      expect(purchasesByRole).toHaveLength(2);
      expect(purchasesByRole[0].id).toEqual(purchaseId);
      expect(purchasesByRole[1].id).toEqual(purchaseId2);

      expect(purchasesByName).toHaveLength(1);
      expect(purchasesByName[0].id).toEqual(purchaseId);

      expect(purchasesByEmail).toHaveLength(1);
      expect(purchasesByEmail[0].id).toEqual(purchaseId2);
    });

    it("throws UnableToFindError when trying to search by a non-existent employee property or that search is empty", async () => {
      const employeeId = await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      await app.registerBusinessPartner(partner);
      const equipmentId = await app.registerEquipment(equipment);
      const foodId = await app.registerFood(food);
      const treatmentId = await app.registerTreatment(treatment);

      await app.registerPurchase(
        6498.4,
        partner.ein,
        foodId,
        treatmentId,
        employeeId,
        employee.email
      );

      await app.registerPurchase(
        6498.4,
        partner.ein,
        foodId,
        treatmentId,
        equipmentId,
        employee.email
      );

      await expect(
        app.findPurchasesByEmployee("email", "medeiro@mail.com")
      ).rejects.toThrow(UnableToFindError);

      await expect(app.findPurchasesByEmployee("name", "john")).rejects.toThrow(
        UnableToFindError
      );

      await expect(
        app.findPurchasesByEmployee("role", "accountant")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findPurchasesByEmployee("email", "aaron@mail.com")
      ).rejects.toThrow(UnableToFindError);
    });
  });

  describe("retrieves a list of medications by some employee property", () => {
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

    const seller = new BusinessPartner(
      987,
      "company@mail.com",
      "company llc",
      "street 4, 873"
    );

    const treatment = new Treatment(
      "skin med",
      300,
      9800.9,
      new Date("2024-10-10"),
      seller
    );

    it("throws InvalidInputError when trying to register a medication with negative quantity", async () => {
      await app.registerEmployee(employee);
      const tankId = await app.registerTank(tank);
      await app.registerBusinessPartner(seller);
      const treatmentId = await app.registerTreatment(treatment);

      await expect(
        app.registerMedication(tankId, employee.email, treatmentId, -9)
      ).rejects.toThrow(InvalidInputError);
    });

    it("returns a list of medications", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      const tankId = await app.registerTank(tank);
      await app.registerBusinessPartner(seller);
      const treatmentId = await app.registerTreatment(treatment);

      const medicationId = await app.registerMedication(
        tankId,
        employee.email,
        treatmentId,
        10
      );

      const medicationId2 = await app.registerMedication(
        tankId,
        employee2.email,
        treatmentId,
        10
      );

      const medicationsByRole = await app.findMedicationsByEmployee(
        "role",
        "president"
      );

      const medicationsByName = await app.findMedicationsByEmployee(
        "name",
        "david"
      );

      const medicationsByEmail = await app.findMedicationsByEmployee(
        "email",
        "aaron@mail.com"
      );

      expect(medicationsByRole).toHaveLength(2);
      expect(medicationsByRole[0].id).toEqual(medicationId);
      expect(medicationsByRole[1].id).toEqual(medicationId2);

      expect(medicationsByName).toHaveLength(1);
      expect(medicationsByName[0].id).toEqual(medicationId);

      expect(medicationsByEmail).toHaveLength(1);
      expect(medicationsByEmail[0].id).toEqual(medicationId2);
    });

    it("throws UnableToFindError when trying to search by a non-existent employee property or that search is empty", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      const tankId = await app.registerTank(tank);
      await app.registerBusinessPartner(seller);
      const treatmentId = await app.registerTreatment(treatment);

      await app.registerMedication(tankId, employee.email, treatmentId, 10);

      await app.registerMedication(tankId, employee.email, treatmentId, 10);

      await expect(
        app.findMedicationsByEmployee("email", "medeiro@mail.com")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findMedicationsByEmployee("name", "john")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findMedicationsByEmployee("role", "accountant")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findMedicationsByEmployee("email", "aaron@mail.com")
      ).rejects.toThrow(UnableToFindError);
    });
  });

  describe("retrieves a list of maintenances by some employee property", () => {
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

    const seller = new BusinessPartner(
      987,
      "company@mail.com",
      "company llc",
      "street 4, 873"
    );

    const equipment = new Equipment(
      "oxygen bomb",
      "ok",
      "room 4",
      seller,
      0,
      14000,
      1
    );

    const equipment2 = new Equipment(
      "oxygen bomb",
      "ok",
      "room 5",
      seller,
      0,
      14500,
      1
    );

    it("throws InvalidInputError when trying to register a maintenance with negative cost", async () => {
      await app.registerEmployee(employee);
      await app.registerBusinessPartner(seller);
      const equipmentId = await app.registerEquipment(equipment);

      await expect(
        app.registerMaintenance(equipmentId, employee.email, -988.9)
      ).rejects.toThrow(InvalidInputError);
    });

    it("returns a list of maintenances", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      await app.registerBusinessPartner(seller);
      const equipmentId = await app.registerEquipment(equipment);

      const maintenanceId = await app.registerMaintenance(
        equipmentId,
        employee.email,
        1000
      );

      const maintenanceId2 = await app.registerMaintenance(
        equipmentId,
        employee2.email,
        1000
      );

      const maintenancesByRole = await app.findMaintenancesByEmployee(
        "role",
        "president"
      );

      const maintenancesByName = await app.findMaintenancesByEmployee(
        "name",
        "david"
      );

      const maintenancesByEmail = await app.findMaintenancesByEmployee(
        "email",
        "aaron@mail.com"
      );

      expect(maintenancesByRole).toHaveLength(2);
      expect(maintenancesByRole[0].id).toEqual(maintenanceId);
      expect(maintenancesByRole[1].id).toEqual(maintenanceId2);

      expect(maintenancesByName).toHaveLength(1);
      expect(maintenancesByName[0].id).toEqual(maintenanceId);

      expect(maintenancesByEmail).toHaveLength(1);
      expect(maintenancesByEmail[0].id).toEqual(maintenanceId2);
    });

    it("throws UnableToFindError when trying to search by a non-existent employee property or that search is empty", async () => {
      await app.registerEmployee(employee);
      await app.registerEmployee(employee2);
      await app.registerBusinessPartner(seller);
      const equipmentId = await app.registerEquipment(equipment2);
      await app.registerMaintenance(equipmentId, employee.email, 1000);

      await app.registerMaintenance(equipmentId, employee.email, 1000);

      await expect(
        app.findMaintenancesByEmployee("email", "medeiro@mail.com")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findMaintenancesByEmployee("name", "john")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findMaintenancesByEmployee("role", "accountant")
      ).rejects.toThrow(UnableToFindError);

      await expect(
        app.findMaintenancesByEmployee("email", "aaron@mail.com")
      ).rejects.toThrow(UnableToFindError);
    });
  });
});
