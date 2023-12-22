import { Tank } from "../entities/tank";

export interface TankRepo {
  add(tank: Tank): Promise<string>;
  find(id: string): Promise<Tank | undefined>;
  findBy(
    attribute: "type" | "capacity" | "location" | "status",
    attributeValue: string | number
  ): Promise<Tank[]>;
  updateStatus(id: string, status: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Tank[]>;
}
