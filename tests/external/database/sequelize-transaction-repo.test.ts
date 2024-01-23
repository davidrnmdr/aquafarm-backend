import { BusinessPartner } from "../../../src/entities/businessPartner";
import { Employee } from "../../../src/entities/employee";
import { Equipment } from "../../../src/entities/equipment";
import { Food } from "../../../src/entities/food";
import { Purchase } from "../../../src/entities/purchase";
import { Sale } from "../../../src/entities/sale";
import { Treatment } from "../../../src/entities/treatment";
import {
  BusinessPartners,
  Employees,
  Equipments,
  Foods,
  Transactions,
  Treatments,
} from "../../../src/services/database/models";
import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";
import { SequelizeEmployeeRepo } from "../../../src/services/database/sequelize-employee-repo";
import { SequelizeEquipmentRepo } from "../../../src/services/database/sequelize-equipment-repo";
import { SequelizeFoodRepo } from "../../../src/services/database/sequelize-food-repo";
import { SequelizeTransactionRepo } from "../../../src/services/database/sequelize-transaction-repo";
import { SequelizeTreatmentRepo } from "../../../src/services/database/sequelize-treatment-repo";

describe("sequelize transaction repository", () => {
  const sequelizeTransactionRepo = new SequelizeTransactionRepo();
  const sequelizePartnerRepo = new SequelizeBusinessPartnerRepo();
  const sequelizeFoodRepo = new SequelizeFoodRepo();
  const sequelizeTreatmentRepo = new SequelizeTreatmentRepo();
  const sequelizeEquipmentRepo = new SequelizeEquipmentRepo();
  const sequelizeEmployeeRepo = new SequelizeEmployeeRepo();
  let newId: string;
  let newId2: string;
  let seller: BusinessPartner;
  let sellerId: string;
  let food: Food;
  let foodId: string;
  let treatment: Treatment;
  let treatmentId: string;
  let equipment: Equipment;
  let equipmentId: string;
  let employee: Employee;
  let employeeId: string;
  let purchase: Purchase;
  let sale: Sale;

  beforeEach(async () => {
    await Employees.sync({ force: true });
    await BusinessPartners.sync({ force: true });
    await Foods.sync({ force: true });
    await Treatments.sync({ force: true });
    await Equipments.sync({ force: true });
    await Transactions.sync({ force: true });

    employeeId = await sequelizeEmployeeRepo.add(
      (employee = new Employee("david", "david@mail.com", "president", "123"))
    );

    sellerId = await sequelizePartnerRepo.add(
      (seller = new BusinessPartner(
        987,
        "company@mail.com",
        "company llc",
        "street 2, 988"
      ))
    );

    foodId = await sequelizeFoodRepo.add(
      (food = new Food("flakes", 200, 1400.99, new Date("2028-11-11"), seller))
    );

    treatmentId = await sequelizeTreatmentRepo.add(
      (treatment = new Treatment(
        "skin med",
        100,
        12000,
        new Date("2028-11-11"),
        seller
      ))
    );

    equipmentId = await sequelizeEquipmentRepo.add(
      (equipment = new Equipment(
        "air conditioner",
        "new",
        "room 2",
        seller,
        0,
        1200,
        2
      ))
    );

    newId = await sequelizeTransactionRepo.add(
      (purchase = new Purchase(
        1000,
        seller,
        new Date(),
        food,
        treatment,
        equipment,
        employee
      ))
    );

    newId2 = await sequelizeTransactionRepo.add(
      (sale = new Sale(2000, seller, new Date(), 300, employee))
    );
  }, 20000);

  afterAll(async () => {
    await Employees.sync({ force: true });
    await BusinessPartners.sync({ force: true });
    await Foods.sync({ force: true });
    await Treatments.sync({ force: true });
    await Equipments.sync({ force: true });
    await Transactions.sync({ force: true });
  });

  it("adds a transaction to the repository", async () => {
    expect(newId).toBeTruthy();
    expect(newId2).toBeTruthy();
  });

  it("finds a transaction by id", async () => {
    const retrievedPurchase = await sequelizeTransactionRepo.find(
      "purchase",
      newId
    );
    const retrievedSale = await sequelizeTransactionRepo.find("sale", newId2);

    const shouldBeUndefined = await sequelizeTransactionRepo.find(
      "sale",
      "12345"
    );

    expect(retrievedPurchase).toBeInstanceOf(Purchase);
    expect(retrievedSale).toBeInstanceOf(Sale);
    expect(retrievedPurchase?.id).toEqual(newId);
    expect(retrievedSale?.id).toEqual(newId2);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("finds transaction by some given employee attribute", async () => {
    const purchasesByEmail = await sequelizeTransactionRepo.findByEmployee(
      "purchase",
      "email",
      "david@mail.com"
    );

    const purchasesByName = await sequelizeTransactionRepo.findByEmployee(
      "purchase",
      "name",
      "aaron"
    );

    const purchasesByRole = await sequelizeTransactionRepo.findByEmployee(
      "purchase",
      "role",
      "president"
    );

    expect(JSON.stringify(purchasesByEmail[0])).toEqual(
      JSON.stringify(purchase)
    );
    expect(purchasesByEmail[1]).toBeFalsy();

    expect(purchasesByName[0]).toBeFalsy();

    expect(JSON.stringify(purchasesByRole[0])).toEqual(
      JSON.stringify(purchase)
    );
    expect(purchasesByRole[1]).toBeFalsy();

    const salesByEmail = await sequelizeTransactionRepo.findByEmployee(
      "sale",
      "email",
      "david@mail.com"
    );

    const saleByName = await sequelizeTransactionRepo.findByEmployee(
      "sale",
      "name",
      "aaron"
    );

    const saleByRole = await sequelizeTransactionRepo.findByEmployee(
      "sale",
      "role",
      "president"
    );

    expect(JSON.stringify(salesByEmail[0])).toEqual(JSON.stringify(sale));
    expect(salesByEmail[1]).toBeFalsy();

    expect(saleByName[0]).toBeFalsy();

    expect(JSON.stringify(saleByRole[0])).toEqual(JSON.stringify(sale));
    expect(saleByRole[1]).toBeFalsy();
  }, 10000);

  it("lists all purchases or sales", async () => {
    const purchaseList = await sequelizeTransactionRepo.list("purchase");

    expect(purchaseList[0]).toBeInstanceOf(Purchase);
    expect(purchaseList[0].id).toEqual(newId);
    expect(purchaseList[1]).toBeUndefined();

    const saleList = await sequelizeTransactionRepo.list("sale");

    expect(saleList[0]).toBeInstanceOf(Sale);
    expect(saleList[0].id).toEqual(newId2);
    expect(saleList[1]).toBeUndefined();
  });
});
