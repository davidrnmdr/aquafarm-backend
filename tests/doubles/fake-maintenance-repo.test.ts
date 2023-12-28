import { FakeMaintenanceRepo } from "../../src/doubles/fake-maintenance-repo";
import { BusinessPartner } from "../../src/entities/businessPartner";
import { Employee } from "../../src/entities/employee";
import { Equipment } from "../../src/entities/equipment";
import { Maintenance } from "../../src/entities/maintenance";

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
    299.9,
    1
  );
  const employee = new Employee("david", "david@mail.com", "president", "123");
  const employee2 = new Employee("aaron", "aaron@mail.com", "president", "123");

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

  it("finds maintenances by some given employee attribute", async () => {
    const maintenanceToBeAdded = new Maintenance(
      equipment,
      employee,
      new Date("2023-12-20"),
      982.9
    );
    const newId = await fakeMaintenanceRepo.add(maintenanceToBeAdded);

    const maintenanceToBeAdded2 = new Maintenance(
      equipment,
      employee2,
      new Date("2023-12-20"),
      982.9
    );
    const newId2 = await fakeMaintenanceRepo.add(maintenanceToBeAdded2);

    const maintenancesByEmail = await fakeMaintenanceRepo.findByEmployee(
      "email",
      "david@mail.com"
    );

    const maintenancesByName = await fakeMaintenanceRepo.findByEmployee(
      "name",
      "aaron"
    );

    const maintenancesByRole = await fakeMaintenanceRepo.findByEmployee(
      "role",
      "president"
    );

    expect(maintenancesByEmail.includes(maintenanceToBeAdded)).toBeTruthy();
    expect(maintenancesByEmail).toHaveLength(1);

    expect(maintenancesByName.includes(maintenanceToBeAdded2)).toBeTruthy();
    expect(maintenancesByName).toHaveLength(1);

    expect(maintenancesByRole.includes(maintenanceToBeAdded)).toBeTruthy();
    expect(maintenancesByRole.includes(maintenanceToBeAdded2)).toBeTruthy();
    expect(maintenancesByRole).toHaveLength(2);
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
