import { Equipment } from "../entities/equipment";
import { EquipmentRepo } from "../ports/equipments-repo";
import crypto from "crypto";

export class FakeEquipmentRepo implements EquipmentRepo {
  equipments: Equipment[] = [];

  async add(equipment: Equipment): Promise<string> {
    const newId = crypto.randomUUID();
    equipment.id = newId;
    this.equipments.push(equipment);
    return newId;
  }

  async find(id: string): Promise<Equipment | undefined> {
    return this.equipments.find((equipment) => (equipment.id = id));
  }

  async updateStatus(id: string, status: string): Promise<void> {
    const equipmentIndex = this.equipments.findIndex(
      (equipment) => equipment.id === id
    );

    this.equipments[equipmentIndex].status = status;
  }

  async updateMaintenanceCost(id: string, cost: number): Promise<void> {
    const equipmentIndex = this.equipments.findIndex(
      (equipment) => equipment.id === id
    );

    this.equipments[equipmentIndex].totalMaintenanceCost += cost;
  }

  async delete(id: string): Promise<void> {
    const equipmentIndex = this.equipments.findIndex(
      (equipment) => equipment.id === id
    );

    if (equipmentIndex != -1) this.equipments.splice(equipmentIndex, 1);
  }

  async list(): Promise<Equipment[]> {
    return this.equipments;
  }
}
