import { EquipmentRepo } from "../../ports/equipments-repo";

import * as crypto from "crypto";


import { BusinessPartners, Equipments } from "./models";
import { Equipment } from "../../entities/equipment";
import { partnerInstanceToObj } from "./sequelize-businessPartner-repo";

export class SequelizeEquipmentRepo implements EquipmentRepo {
  async add(equipment: Equipment): Promise<string> {
    const newId = crypto.randomUUID();

    await Equipments.create({
      equipmentType: equipment.type,
      equipmentStatus: equipment.status,
      equipmentLocation: equipment.location,
      equipmentSellerId: equipment.seller.id,
      equipmentMaintenanceCost: equipment.totalMaintenanceCost,
      equipmentCost: equipment.cost,
      equipmentQuantity: equipment.quantity,
      equipmentId: newId,
    });

    equipment.id = newId;

    return newId;
  }

  async find(id: string): Promise<Equipment | undefined> {
    const equipment = await Equipments.findOne({ where: { equipmentId: id } });
    return equipment ? equipmentInstanceToObj(equipment) : undefined;
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await Equipments.update(
      { equipmentStatus: status },
      { where: { equipmentId: id } }
    );
  }

  async updateMaintenanceCost(id: string, cost: number): Promise<void> {
    await Equipments.increment(
      { equipmentMaintenanceCost: cost },
      { where: { equipmentId: id } }
    );
  }

  async delete(id: string): Promise<void> {
    await Equipments.destroy({ where: { equipmentId: id } });
  }

  async list(): Promise<Equipment[]> {
    const allEquipmentInstances = await Equipments.findAll();
    const allEquipmentObjects: Equipment[] = [];

    for (let i = 0; i < allEquipmentInstances.length; i++) {
      allEquipmentObjects.push(
        await equipmentInstanceToObj(allEquipmentInstances[i])
      );
    }

    return allEquipmentObjects;
  }
}

export async function equipmentInstanceToObj(
  instance: any
): Promise<Equipment> {
  return new Equipment(
    instance.dataValues.equipmentType,
    instance.dataValues.equipmentStatus,
    instance.dataValues.equipmentLocation,
    partnerInstanceToObj(
      await BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.equipmentSellerId },
      })
    ),
    instance.dataValues.equipmentMaintenanceCost,
    instance.dataValues.equipmentCost,
    instance.dataValues.equipmentQuantity,
    instance.dataValues.equipmentId
  );
}
