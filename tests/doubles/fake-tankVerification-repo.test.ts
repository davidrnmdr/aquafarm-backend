import { FakeTankVerificationRepo } from "../../src/doubles/fake-tankVerification-repo";
import { Employee } from "../../src/entities/employee";
import { Tank } from "../../src/entities/tank";
import { TankVerification } from "../../src/entities/tankVerification";

let fakeTankVerificationRepo: FakeTankVerificationRepo;

describe("fake tank verification repository", () => {
  beforeEach(() => {
    fakeTankVerificationRepo = new FakeTankVerificationRepo();
  });

  const tank = new Tank("M-B1", "room 2", 23.1, 1300);
  const employee = new Employee("david", "david@mail.com", "president", "123");

  it("adds a verification to the repository", async () => {
    const verificationToBeAdded = new TankVerification(
      tank,
      employee,
      23.45,
      20.2,
      7,
      new Date("2023-11-10")
    );

    const newId = await fakeTankVerificationRepo.add(verificationToBeAdded);

    expect(newId).toBeTruthy();
    expect(fakeTankVerificationRepo.verifications[0].id).toEqual(newId);
  });

  it("finds a verification by id", async () => {
    const verificationToBeAdded = new TankVerification(
      tank,
      employee,
      23.45,
      20.2,
      7,
      new Date("2023-11-10")
    );

    const newId = await fakeTankVerificationRepo.add(verificationToBeAdded);

    const retrievedVerification = await fakeTankVerificationRepo.find(newId);

    expect(retrievedVerification).toBeDefined();
    expect(retrievedVerification?.id).toEqual(verificationToBeAdded.id);
  });

  it("removes a verification from the repository", async () => {
    const verificationToBeAdded1 = new TankVerification(
      tank,
      employee,
      24.2,
      21.3,
      6.5,
      new Date("2023-11-10")
    );

    const newId1 = await fakeTankVerificationRepo.add(verificationToBeAdded1);

    const verificationToBeAdded2 = new TankVerification(
      tank,
      employee,
      23.45,
      20.2,
      7,
      new Date("2023-11-10")
    );

    const newId2 = await fakeTankVerificationRepo.add(verificationToBeAdded2);

    await fakeTankVerificationRepo.delete(newId1);

    expect(
      fakeTankVerificationRepo.verifications.includes(verificationToBeAdded1)
    ).toBeFalsy();
    expect(
      fakeTankVerificationRepo.verifications.includes(verificationToBeAdded2)
    ).toBeTruthy();
  });
});
