import { Equipment } from "../entities/equipment";

export interface EquipmentRepo {
  add(equipment: Equipment): Promise<string>;
  find(id: string): Promise<Equipment | undefined>;
  updateStatus(id: string, status: string): Promise<void>;
  updateMaintenanceCost(id: string, cost: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Equipment[]>;
}
