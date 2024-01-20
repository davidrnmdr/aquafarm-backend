import { Equipment } from "../../../src/entities/equipment";
import { SequelizeEquipmentRepo } from "../../../src/services/database/sequelize-equipment-repo";

import {
  BusinessPartners,
  Equipments,
} from "../../../src/services/database/models";
import { BusinessPartner } from "../../../src/entities/businessPartner";
import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";

describe("sequelize equipments repository", () => {
  const sequelizeEquipmentRepo = new SequelizeEquipmentRepo();
  const sequelizePartnerRepo = new SequelizeBusinessPartnerRepo();
  let newId: string;
  let newId2: string;
  let sellerId: string;

  const seller = new BusinessPartner(
    123,
    "company@mail.com",
    "company llc",
    "street 2, 987"
  );

  beforeEach(async () => {
    await BusinessPartners.sync({ force: true });
    await Equipments.sync({ force: true });

    sellerId = await sequelizePartnerRepo.add(seller);
    seller.id = sellerId;

    newId = await sequelizeEquipmentRepo.add(
      new Equipment("oxygen bomb", "new", "room 4", seller, 0, 1200, 2)
    );

    newId2 = await sequelizeEquipmentRepo.add(
      new Equipment("computer", "new", "office 2", seller, 0, 400, 1)
    );
  }, 20000);

  afterAll(async () => {
    await BusinessPartners.sync({ force: true });
    await Equipments.sync({ force: true });
  }, 20000);

  it("adds an equipment to the repository", async () => {
    expect(newId).toBeTruthy();
  });

  it("finds an equipment by id", async () => {
    const retrievedEquipment = await sequelizeEquipmentRepo.find(newId);

    const shouldBeUndefined = await sequelizeEquipmentRepo.find("123445");

    expect(retrievedEquipment).toBeInstanceOf(Equipment);
    expect(retrievedEquipment?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("updades the status of a given equipment", async () => {
    const newStatus = "broken";

    await sequelizeEquipmentRepo.updateStatus(newId, newStatus);

    const retrievedEquipment = await sequelizeEquipmentRepo.find(newId);

    expect(retrievedEquipment?.status).toEqual(newStatus);
  });

  it("updates the maintenance cost of a given equipment", async () => {
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
    await sequelizeEquipmentRepo.delete(newId);

    const shouldBeUndefined = await sequelizeEquipmentRepo.find(newId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all equipments", async () => {
    const equipmentList = await sequelizeEquipmentRepo.list();

    expect(equipmentList[0]).toBeInstanceOf(Equipment);
    expect(equipmentList[0].id).toEqual(newId);
    expect(equipmentList[1].id).toEqual(newId2);
  });
});
