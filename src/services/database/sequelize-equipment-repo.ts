import { EquipmentRepo } from "../../ports/equipments-repo";

import crypto from "crypto";

import { Equipments } from "./models";
import { Equipment } from "../../entities/equipment";

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
    return (await Equipments.findAll()).map(equipmentInstanceToObj);
  }
}

function equipmentInstanceToObj(instance: any): Equipment {
  return new Equipment(
    instance.dataValues.equipmentType,
    instance.dataValues.equipmentStatus,
    instance.dataValues.equipmentLocation,
    instance.dataValues.equipmentSellerId,
    instance.dataValues.equipmentMaintenanceCost,
    instance.dataValues.equipmentCost,
    instance.dataValues.equipmentQuantity,
    instance.dataValues.equipmentId
  );
}
