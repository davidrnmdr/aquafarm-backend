"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const businessPartner_1 = require("../../../src/entities/businessPartner");
const employee_1 = require("../../../src/entities/employee");
const equipment_1 = require("../../../src/entities/equipment");
const food_1 = require("../../../src/entities/food");
const purchase_1 = require("../../../src/entities/purchase");
const sale_1 = require("../../../src/entities/sale");
const treatment_1 = require("../../../src/entities/treatment");
const models_1 = require("../../../src/services/database/models");
const sequelize_businessPartner_repo_1 = require("../../../src/services/database/sequelize-businessPartner-repo");
const sequelize_employee_repo_1 = require("../../../src/services/database/sequelize-employee-repo");
const sequelize_equipment_repo_1 = require("../../../src/services/database/sequelize-equipment-repo");
const sequelize_food_repo_1 = require("../../../src/services/database/sequelize-food-repo");
const sequelize_transaction_repo_1 = require("../../../src/services/database/sequelize-transaction-repo");
const sequelize_treatment_repo_1 = require("../../../src/services/database/sequelize-treatment-repo");
describe("sequelize transaction repository", () => {
    const sequelizeTransactionRepo = new sequelize_transaction_repo_1.SequelizeTransactionRepo();
    const sequelizePartnerRepo = new sequelize_businessPartner_repo_1.SequelizeBusinessPartnerRepo();
    const sequelizeFoodRepo = new sequelize_food_repo_1.SequelizeFoodRepo();
    const sequelizeTreatmentRepo = new sequelize_treatment_repo_1.SequelizeTreatmentRepo();
    const sequelizeEquipmentRepo = new sequelize_equipment_repo_1.SequelizeEquipmentRepo();
    const sequelizeEmployeeRepo = new sequelize_employee_repo_1.SequelizeEmployeeRepo();
    let newId;
    let newId2;
    let seller;
    let sellerId;
    let food;
    let foodId;
    let treatment;
    let treatmentId;
    let equipment;
    let equipmentId;
    let employee;
    let employeeId;
    let purchase;
    let sale;
    beforeEach(async () => {
        await models_1.Employees.sync({ force: true });
        await models_1.BusinessPartners.sync({ force: true });
        await models_1.Foods.sync({ force: true });
        await models_1.Treatments.sync({ force: true });
        await models_1.Equipments.sync({ force: true });
        await models_1.Transactions.sync({ force: true });
        employeeId = await sequelizeEmployeeRepo.add((employee = new employee_1.Employee("david", "david@mail.com", "president", "123")));
        sellerId = await sequelizePartnerRepo.add((seller = new businessPartner_1.BusinessPartner(987, "company@mail.com", "company llc", "street 2, 988")));
        foodId = await sequelizeFoodRepo.add((food = new food_1.Food("flakes", 200, 1400.99, new Date("2028-11-11"), seller)));
        treatmentId = await sequelizeTreatmentRepo.add((treatment = new treatment_1.Treatment("skin med", 100, 12000, new Date("2028-11-11"), seller)));
        equipmentId = await sequelizeEquipmentRepo.add((equipment = new equipment_1.Equipment("air conditioner", "new", "room 2", seller, 0, 1200, 2)));
        newId = await sequelizeTransactionRepo.add((purchase = new purchase_1.Purchase(1000, seller, new Date(), food, treatment, equipment, employee)));
        newId2 = await sequelizeTransactionRepo.add((sale = new sale_1.Sale(2000, seller, new Date(), 300, employee)));
    }, 20000);
    afterAll(async () => {
        await models_1.Employees.sync({ force: true });
        await models_1.BusinessPartners.sync({ force: true });
        await models_1.Foods.sync({ force: true });
        await models_1.Treatments.sync({ force: true });
        await models_1.Equipments.sync({ force: true });
        await models_1.Transactions.sync({ force: true });
    });
    it("adds a transaction to the repository", async () => {
        expect(newId).toBeTruthy();
        expect(newId2).toBeTruthy();
    });
    it("finds a transaction by id", async () => {
        const retrievedPurchase = await sequelizeTransactionRepo.find("purchase", newId);
        const retrievedSale = await sequelizeTransactionRepo.find("sale", newId2);
        const shouldBeUndefined = await sequelizeTransactionRepo.find("sale", "12345");
        expect(retrievedPurchase).toBeInstanceOf(purchase_1.Purchase);
        expect(retrievedSale).toBeInstanceOf(sale_1.Sale);
        expect(retrievedPurchase?.id).toEqual(newId);
        expect(retrievedSale?.id).toEqual(newId2);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("finds transaction by some given employee attribute", async () => {
        const purchasesByEmail = await sequelizeTransactionRepo.findByEmployee("purchase", "email", "david@mail.com");
        const purchasesByName = await sequelizeTransactionRepo.findByEmployee("purchase", "name", "aaron");
        const purchasesByRole = await sequelizeTransactionRepo.findByEmployee("purchase", "role", "president");
        expect(JSON.stringify(purchasesByEmail[0])).toEqual(JSON.stringify(purchase));
        expect(purchasesByEmail[1]).toBeFalsy();
        expect(purchasesByName[0]).toBeFalsy();
        expect(JSON.stringify(purchasesByRole[0])).toEqual(JSON.stringify(purchase));
        expect(purchasesByRole[1]).toBeFalsy();
        const salesByEmail = await sequelizeTransactionRepo.findByEmployee("sale", "email", "david@mail.com");
        const saleByName = await sequelizeTransactionRepo.findByEmployee("sale", "name", "aaron");
        const saleByRole = await sequelizeTransactionRepo.findByEmployee("sale", "role", "president");
        expect(JSON.stringify(salesByEmail[0])).toEqual(JSON.stringify(sale));
        expect(salesByEmail[1]).toBeFalsy();
        expect(saleByName[0]).toBeFalsy();
        expect(JSON.stringify(saleByRole[0])).toEqual(JSON.stringify(sale));
        expect(saleByRole[1]).toBeFalsy();
    }, 10000);
    it("lists all purchases or sales", async () => {
        const purchaseList = await sequelizeTransactionRepo.list("purchase");
        expect(purchaseList[0]).toBeInstanceOf(purchase_1.Purchase);
        expect(purchaseList[0].id).toEqual(newId);
        expect(purchaseList[1]).toBeUndefined();
        const saleList = await sequelizeTransactionRepo.list("sale");
        expect(saleList[0]).toBeInstanceOf(sale_1.Sale);
        expect(saleList[0].id).toEqual(newId2);
        expect(saleList[1]).toBeUndefined();
    });
});
