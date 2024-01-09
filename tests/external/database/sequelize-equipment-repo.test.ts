import { Equipment } from "../../../src/entities/equipment";
import { SequelizeEquipmentRepo } from "../../../src/services/database/sequelize-equipment-repo";

import { Equipments } from "../../../src/services/database/models";
import { BusinessPartner } from "../../../src/entities/businessPartner";

describe("sequelize equipments repository", () => {
  const sequelizeEquipmentRepo = new SequelizeEquipmentRepo();

  beforeEach(async () => {
    await Equipments.sync({ force: true });
  }, 20000);

  afterEach(async () => {
    await Equipments.sync({ force: true });
  }, 20000);

  const seller = new BusinessPartner(
    123,
    "company@mail.com",
    "company llc",
    "street 2, 987"
  );

  const equipment = new Equipment(
    "oxygen bomb",
    "new",
    "room 4",
    seller,
    0,
    1200,
    2
  );

  const equipment2 = new Equipment(
    "computer",
    "new",
    "office 2",
    seller,
    0,
    400,
    1
  );

  it("adds a equipment to the repository", async () => {
    const newId = await sequelizeEquipmentRepo.add(equipment);

    expect(newId).toBeTruthy();
  });

  it("finds an equipment by id", async () => {
    const newId = await sequelizeEquipmentRepo.add(equipment);

    const retrievedEquipment = await sequelizeEquipmentRepo.find(newId);

    const shouldBeUndefined = await sequelizeEquipmentRepo.find("12345");

    expect(retrievedEquipment).toBeInstanceOf(Equipment);
    expect(retrievedEquipment?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("updades the status of a given equipment", async () => {
    const newId = await sequelizeEquipmentRepo.add(equipment);

    const newStatus = "broken";

    await sequelizeEquipmentRepo.updateStatus(newId, newStatus);

    const retrievedEquipment = await sequelizeEquipmentRepo.find(newId);

    expect(retrievedEquipment?.status).toEqual(newStatus);
  });

  it("updates the maintenance cost of a given equipment", async () => {
    const newId = await sequelizeEquipmentRepo.add(equipment);

    const newCost = 299.2;
    await sequelizeEquipmentRepo.updateMaintenanceCost(newId, newCost);

    let retrievedEquipment = await sequelizeEquipmentRepo.find(newId);
    expect(retrievedEquipment?.totalMaintenanceCost).toEqual(newCost);

    const newCost2 = 100;
    await sequelizeEquipmentRepo.updateMaintenanceCost(newId, newCost2);
    retrievedEquipment = await sequelizeEquipmentRepo.find(newId);
    expect(retrievedEquipment?.totalMaintenanceCost).toEqual(
      newCost + newCost2
    );
  });

  it("deletes a given equipment", async () => {
    const newId = await sequelizeEquipmentRepo.add(equipment);

    await sequelizeEquipmentRepo.delete(newId);

    const shouldBeUndefined = await sequelizeEquipmentRepo.find(newId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all equipments", async () => {
    const newId = await sequelizeEquipmentRepo.add(equipment);
    const newId2 = await sequelizeEquipmentRepo.add(equipment2);

    const equipmentList = await sequelizeEquipmentRepo.list();

    expect(equipmentList[0]).toBeInstanceOf(Equipment);
    expect(equipmentList[0].id).toEqual(newId);
    expect(equipmentList[1].id).toEqual(newId2);
  });
});
