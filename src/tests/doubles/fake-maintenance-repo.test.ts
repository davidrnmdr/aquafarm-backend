import { FakeMaintenanceRepo } from "../../doubles/fake-maintenance-repo";
import { BusinessPartner } from "../../entities/businessPartner";
import { Employee } from "../../entities/employee";
import { Equipment } from "../../entities/equipment";
import { Maintenance } from "../../entities/maintenance";

let fakeMaintenanceRepo: FakeMaintenanceRepo;

/*
Registering a maintenance event implies on the increment of the field
totalMaintenanceCost of the equipment and change of its status however, 
since this is a higher level feature, we will test this behaviour at ./src/app.ts
*/

describe("fake maintenance repository", () => {
  beforeEach(() => {
    fakeMaintenanceRepo = new FakeMaintenanceRepo();
  });

  const partner = new BusinessPartner(
    2233,
    "company@mail.com",
    "company llc",
    "street 8",
    [],
    []
  );
  const equipment = new Equipment(
    "machine",
    "broken",
    "room 2",
    partner,
    0,
    299.9
  );
  const employee = new Employee("david", "david@mail.com", "president");

  it("adds a maintenance to the repository", async () => {
    const maintenanceToBeAdded = new Maintenance(
      equipment,
      employee,
      new Date("2023-12-20"),
      982.9
    );

    const newId = await fakeMaintenanceRepo.add(maintenanceToBeAdded);

    expect(newId).toBeTruthy();
    expect(fakeMaintenanceRepo.maintenances[0].id).toEqual(newId);
  });

  it("finds a maintenance by id", async () => {
    const maintenanceToBeAdded = new Maintenance(
      equipment,
      employee,
      new Date("2023-12-20"),
      982.9
    );

    const newId = await fakeMaintenanceRepo.add(maintenanceToBeAdded);

    const retrievedMaintenance = await fakeMaintenanceRepo.find(newId);

    expect(retrievedMaintenance).toBeDefined();
    expect(retrievedMaintenance?.id).toEqual(maintenanceToBeAdded.id);
  });

  it("removes a given maintenance from the repository", async () => {
    const maintenanceToBeAdded1 = new Maintenance(
      equipment,
      employee,
      new Date("2023-12-20"),
      982.9
    );

    const newId1 = await fakeMaintenanceRepo.add(maintenanceToBeAdded1);

    const maintenanceToBeAdded2 = new Maintenance(
      equipment,
      employee,
      new Date("2023-12-19"),
      982.9
    );

    const newId2 = await fakeMaintenanceRepo.add(maintenanceToBeAdded2);

    await fakeMaintenanceRepo.delete(newId1);

    expect(
      fakeMaintenanceRepo.maintenances.includes(maintenanceToBeAdded1)
    ).toBeFalsy();
    expect(
      fakeMaintenanceRepo.maintenances.includes(maintenanceToBeAdded2)
    ).toBeTruthy();
  });
});
