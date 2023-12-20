import { Maintenance } from "../entities/maintenance";

export interface MaintenanceRepo {
  add(maintenance: Maintenance): Promise<string>;
  find(id: string): Promise<Maintenance | undefined>;
  delete(id: string): Promise<void>;
  list(): Promise<Maintenance[]>;
}
