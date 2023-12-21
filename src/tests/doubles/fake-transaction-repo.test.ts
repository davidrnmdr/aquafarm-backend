import { FakeTransactionRepo } from "../../doubles/fake-transaction-repo";
import { BusinessPartner } from "../../entities/businessPartner";
import { Food } from "../../entities/food";
import { Purchase } from "../../entities/purchase";
import { Sale } from "../../entities/sale";
import { Treatment } from "../../entities/treatment";

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

  const food = new Food("flakes", 120, 250, new Date("2024-10-12"), partner);
  const treatment = new Treatment(
    "skin med",
    2,
    250.95,
    new Date("2025-10-12"),
    partner
  );

  it("adds a transaction to the repository", async () => {
    const saleToBeAdded = new Sale(989.9, partner, new Date("2023-08-20"), 100);
    const purchaseToBeAdded = new Purchase(
      500.95,
      partner,
      new Date("2023-12-20"),
      food,
      treatment
    );

    const saleId = await fakeTransactionRepo.add(saleToBeAdded);
    const purchaseId = await fakeTransactionRepo.add(purchaseToBeAdded);

    expect(saleId && purchaseId).toBeTruthy();
    expect(fakeTransactionRepo.sales[0].id).toEqual(saleId);
    expect(fakeTransactionRepo.purchases[0].id).toEqual(purchaseId);
  });

  it("finds a transaction by id and type", async () => {
    const saleToBeAdded = new Sale(989.9, partner, new Date("2023-08-20"), 100);
    const purchaseToBeAdded = new Purchase(
      500.95,
      partner,
      new Date("2023-12-20"),
      food,
      treatment
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
});
