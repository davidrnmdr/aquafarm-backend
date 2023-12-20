import { FakeFeedingRepo } from "../../doubles/fake-feeding-repo";
import { BusinessPartner } from "../../entities/businessPartner";
import { Employee } from "../../entities/employee";
import { Feeding } from "../../entities/feeding";
import { Food } from "../../entities/food";
import { Tank } from "../../entities/tank";

let fakeFeedingRepo: FakeFeedingRepo;

/* 
Adding a feeding to the repository means that some employee has spent food,
which means that we must access the food repository and decrement a given food quantity.
In addition to that, obviosly, that food must have (at least) a quantity that is required to that particular feeding.
But since this behavior is a higher level one we left it to be tested with relation with ./src/app.ts.
*/

describe("fake feeding repository", () => {
  beforeEach(() => {
    fakeFeedingRepo = new FakeFeedingRepo();
  });

  const employee = new Employee("david", "david@mail.com", "president");
  const tank = new Tank("LB-2", "room 3", 60, 1200);
  const seller = new BusinessPartner(
    9982,
    "company@mail.com",
    "company llc",
    "street 5",
    [],
    []
  );
  const food = new Food("flakes", 200, 1200.99, new Date("2024-12-12"), seller);

  it("adds a feeding to the repository", async () => {
    const feedingToBeAdded = new Feeding(
      employee,
      tank,
      food,
      2,
      new Date("2023-10-11")
    );

    const newId = await fakeFeedingRepo.add(feedingToBeAdded);

    expect(newId).toBeTruthy();
    expect(fakeFeedingRepo.feedings[0].id).toEqual(newId);
  });

  it("finds a feeding by id", async () => {
    const feedingToBeAdded = new Feeding(
      employee,
      tank,
      food,
      2,
      new Date("2023-10-11")
    );

    const newId = await fakeFeedingRepo.add(feedingToBeAdded);

    const retrievedFeeding = await fakeFeedingRepo.find(newId);

    expect(retrievedFeeding).toBeDefined();
    expect(retrievedFeeding?.id).toEqual(feedingToBeAdded.id);
  });

  it("removes a given feeding from the repository", async () => {
    const feedingToBeAdded1 = new Feeding(
      employee,
      tank,
      food,
      2,
      new Date("2023-10-11")
    );

    const newId1 = await fakeFeedingRepo.add(feedingToBeAdded1);

    const feedingToBeAdded2 = new Feeding(
      employee,
      tank,
      food,
      4,
      new Date("2024-10-11")
    );

    const newId2 = await fakeFeedingRepo.add(feedingToBeAdded2);

    await fakeFeedingRepo.delete(newId1);

    expect(fakeFeedingRepo.feedings.includes(feedingToBeAdded1)).toBeFalsy();
    expect(fakeFeedingRepo.feedings.includes(feedingToBeAdded2)).toBeTruthy;
  });
});
