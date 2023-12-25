import { Maintenance } from "../entities/maintenance";

export interface MaintenanceRepo {
  add(maintenance: Maintenance): Promise<string>;
  find(id: string): Promise<Maintenance | undefined>;
  findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Maintenance[]>;
  delete(id: string): Promise<void>;
  list(): Promise<Maintenance[]>;
}
