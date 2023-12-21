import { Tank } from "../entities/tank";

export interface TankRepo {
  add(tank: Tank): Promise<string>;
  find(id: string): Promise<Tank | undefined>;
  updateStatus(id: string, status: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Tank[]>;
}
