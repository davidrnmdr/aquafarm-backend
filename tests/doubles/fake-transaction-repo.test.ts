import { FakeTransactionRepo } from "../../src/doubles/fake-transaction-repo";
import { BusinessPartner } from "../../src/entities/businessPartner";
import { Employee } from "../../src/entities/employee";
import { Food } from "../../src/entities/food";
import { Purchase } from "../../src/entities/purchase";
import { Sale } from "../../src/entities/sale";
import { Treatment } from "../../src/entities/treatment";

let fakeTransactionRepo: FakeTransactionRepo;

describe("fake transaction repository", () => {
  beforeEach(() => {
    fakeTransactionRepo = new FakeTransactionRepo();
  });

  const partner = new BusinessPartner(
    2233,
    "company@mail.com",
    "company llc",
    "street 8",
    [],
    []
  );

  const employee = new Employee("david", "david@mail.com", "president", "123");
  const employee2 = new Employee("aaron", "aaron@mail.com", "president", "123");

  const food = new Food("flakes", 120, 250, new Date("2024-10-12"), partner);
  const treatment = new Treatment(
    "skin med",
    2,
    250.95,
    new Date("2025-10-12"),
    partner
  );

  it("adds a transaction to the repository", async () => {
    const saleToBeAdded = new Sale(
      989.9,
      partner,
      new Date("2023-08-20"),
      100,
      employee
    );
    const purchaseToBeAdded = new Purchase(
      500.95,
      partner,
      new Date("2023-12-20"),
      food,
      treatment,
      null,
      employee
    );

    const saleId = await fakeTransactionRepo.add(saleToBeAdded);
    const purchaseId = await fakeTransactionRepo.add(purchaseToBeAdded);

    expect(saleId && purchaseId).toBeTruthy();
    expect(fakeTransactionRepo.sales[0].id).toEqual(saleId);
    expect(fakeTransactionRepo.purchases[0].id).toEqual(purchaseId);
  });

  it("finds a transaction by id and type", async () => {
    const saleToBeAdded = new Sale(
      989.9,
      partner,
      new Date("2023-08-20"),
      100,
      employee
    );
    const purchaseToBeAdded = new Purchase(
      500.95,
      partner,
      new Date("2023-12-20"),
      food,
      treatment,
      null,
      employee
    );

    const saleId = await fakeTransactionRepo.add(saleToBeAdded);
    const purchaseId = await fakeTransactionRepo.add(purchaseToBeAdded);

    const retrievedSale = await fakeTransactionRepo.find("sale", saleId);
    const retrievedPurchase = await fakeTransactionRepo.find(
      "purchase",
      purchaseId
    );

    expect(
      retrievedSale instanceof Sale && retrievedPurchase instanceof Purchase
    ).toBeTruthy();
    expect(retrievedSale?.id).toEqual(saleToBeAdded.id);
    expect(retrievedPurchase?.id).toEqual(purchaseToBeAdded.id);
  });

  it("finds transactions by type and some given employee attribute", async () => {
    const saleToBeAdded = new Sale(
      989.9,
      partner,
      new Date("2023-08-20"),
      100,
      employee
    );
    const saleId = await fakeTransactionRepo.add(saleToBeAdded);

    const purchaseToBeAdded = new Purchase(
      500.95,
      partner,
      new Date("2023-12-20"),
      food,
      treatment,
      null,
      employee
    );
    const purchaseId = await fakeTransactionRepo.add(purchaseToBeAdded);

    const saleToBeAdded2 = new Sale(
      989.9,
      partner,
      new Date("2023-08-20"),
      100,
      employee2
    );
    const saleId2 = await fakeTransactionRepo.add(saleToBeAdded2);

    const purchaseToBeAdded2 = new Purchase(
      500.95,
      partner,
      new Date("2023-12-20"),
      food,
      treatment,
      null,
      employee2
    );
    const purchaseId2 = await fakeTransactionRepo.add(purchaseToBeAdded2);

    const salesByName = await fakeTransactionRepo.findByEmployee(
      "sale",
      "name",
      "david"
    );

    const salesByEmail = await fakeTransactionRepo.findByEmployee(
      "sale",
      "email",
      "david@mail.com"
    );

    const salesByRole = await fakeTransactionRepo.findByEmployee(
      "sale",
      "role",
      "president"
    );

    expect(salesByName).toHaveLength(1);
    expect(salesByName[0].id).toEqual(saleId);

    expect(salesByEmail).toHaveLength(1);
    expect(salesByEmail[0].id).toEqual(saleId);

    expect(salesByRole).toHaveLength(2);
    expect(salesByRole[0].id).toEqual(saleId);
    expect(salesByRole[1].id).toEqual(saleId2);

    const purchasesByName = await fakeTransactionRepo.findByEmployee(
      "purchase",
      "name",
      "david"
    );

    const purchasesByEmail = await fakeTransactionRepo.findByEmployee(
      "purchase",
      "email",
      "david@mail.com"
    );

    const purchasesByRole = await fakeTransactionRepo.findByEmployee(
      "purchase",
      "role",
      "president"
    );

    expect(purchasesByName).toHaveLength(1);
    expect(purchasesByName[0].id).toEqual(purchaseId);

    expect(purchasesByEmail).toHaveLength(1);
    expect(purchasesByEmail[0].id).toEqual(purchaseId);

    expect(purchasesByRole).toHaveLength(2);
    expect(purchasesByRole[0].id).toEqual(purchaseId);
    expect(purchasesByRole[1].id).toEqual(purchaseId2);
  });
});
