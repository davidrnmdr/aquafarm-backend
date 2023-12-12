import { Equipment } from "../equipment";

export interface EquipmentRepo {
  add(equipment: Equipment): Promise<string>;
  find(id: string): Promise<Equipment>;
  updateStatus(id: string, status: string): Promise<void>;
  updateMaintenanceCost(id: string, cost: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Equipment[]>;
}
