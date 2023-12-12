import { Tank } from "../tank";

export interface TankRepo {
  find(id: string): Promise<Tank>;
  add(tank: Tank): Promise<string>;
  updateStatus(id: string, status: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Tank[]>;
}
