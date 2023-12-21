import { FakeTankRepo } from "../../doubles/fake-tank-repo";
import { Tank } from "../../entities/tank";

let fakeTankRepo: FakeTankRepo;

describe("fake tank repository", () => {
  beforeEach(() => {
    fakeTankRepo = new FakeTankRepo();
  });

  it("adds a tank to the repository", async () => {
    const tankToBeAdded = new Tank("L-B2", "room 6", 98, 2000);

    const newId = await fakeTankRepo.add(tankToBeAdded);

    expect(newId).toBeTruthy();
    expect(fakeTankRepo.tanks[0].id).toEqual(tankToBeAdded.id);
  });

  it("finds a tank by id", async () => {
    const tankToBeAdded = new Tank("L-B2", "room 6", 98, 2000);

    const newId = await fakeTankRepo.add(tankToBeAdded);

    const retrievedTank = await fakeTankRepo.find(newId);

    expect(retrievedTank).toBeDefined();
    expect(retrievedTank?.id).toEqual(tankToBeAdded.id);
  });

  it("updates the status of a given tank", async () => {
    const tankToBeAdded = new Tank("L-B2", "room 6", 98, 2000);

    const newId = await fakeTankRepo.add(tankToBeAdded);

    const newStatus = 89.8;
    await fakeTankRepo.updateStatus(newId, newStatus);

    expect(tankToBeAdded.status).toEqual(newStatus);
  });

  it("removes a given tank from the repository", async () => {
    const tankToBeAdded1 = new Tank("L-B2", "room 6", 98, 2000);
    const newId1 = await fakeTankRepo.add(tankToBeAdded1);

    const tankToBeAdded2 = new Tank("S-C2", "room 9", 98, 2000);
    const newId2 = await fakeTankRepo.add(tankToBeAdded2);

    await fakeTankRepo.delete(newId1);

    expect(fakeTankRepo.tanks.includes(tankToBeAdded1)).toBeFalsy();
    expect(fakeTankRepo.tanks.includes(tankToBeAdded2)).toBeTruthy();
  });
});
