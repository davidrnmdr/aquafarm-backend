import { FakeFoodRepo } from "../../doubles/fake-food-repo";
import { BusinessPartner } from "../../entities/businessPartner";
import { Food } from "../../entities/food";

let fakeFoodRepo: FakeFoodRepo;

describe("fake food repository", () => {
  beforeEach(() => {
    fakeFoodRepo = new FakeFoodRepo();
  });

  const seller = new BusinessPartner(
    8999,
    "company@mail.com",
    "company",
    "street 2",
    [],
    []
  );

  it("adds a food to the repository", async () => {
    const foodToBeAdded = new Food(
      "flakes",
      200,
      100.99,
      new Date("2000-01-01"),
      seller
    );

    const newId = await fakeFoodRepo.add(foodToBeAdded);

    expect(newId).toBeTruthy();
    expect(fakeFoodRepo.foods[0].id).toEqual(newId);
  });

  it("finds a food by id", async () => {
    const foodToBeAdded = new Food(
      "flakes",
      200,
      100.99,
      new Date("2000-01-01"),
      seller
    );

    const newId = await fakeFoodRepo.add(foodToBeAdded);

    const retrievedFood = await fakeFoodRepo.find(newId);

    expect(retrievedFood).toBeDefined();
    expect(retrievedFood?.id).toEqual(foodToBeAdded.id);
  });

  it("removes a food from the repository", async () => {
    const foodToBeAdded1 = new Food(
      "flakes",
      200,
      100.99,
      new Date("2000-01-01"),
      seller
    );

    const newId1 = await fakeFoodRepo.add(foodToBeAdded1);

    const foodToBeAdded2 = new Food(
      "pallets",
      300,
      200.99,
      new Date("2001-01-01"),
      seller
    );

    const newId2 = await fakeFoodRepo.add(foodToBeAdded2);

    await fakeFoodRepo.delete(newId1);

    expect(fakeFoodRepo.foods.includes(foodToBeAdded1)).toBeFalsy();
    expect(fakeFoodRepo.foods.includes(foodToBeAdded2)).toBeTruthy();
  });
});
