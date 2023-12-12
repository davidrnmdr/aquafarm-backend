import { Maintenance } from "../entities/maintenance";

export interface MaintenanceRepo {
  find(id: string): Promise<Maintenance>;
  add(maintenance: Maintenance): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<Maintenance[]>;
}
