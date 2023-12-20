import { Maintenance } from "../entities/maintenance";
import { MaintenanceRepo } from "../ports/maintenance-repo";
import crypto from "crypto";

export class FakeMaintenanceRepo implements MaintenanceRepo {
  maintenances: Maintenance[] = [];

  async add(maintenance: Maintenance): Promise<string> {
    const newId = crypto.randomUUID();

    maintenance.id = newId;

    this.maintenances.push(maintenance);
    return newId;
  }

  async find(id: string): Promise<Maintenance | undefined> {
    return this.maintenances.find((maintenance) => maintenance.id === id);
  }

  async delete(id: string): Promise<void> {
    const maintenanceIndex = this.maintenances.findIndex(
      (maintenance) => maintenance.id === id
    );

    if (maintenanceIndex != -1) this.maintenances.splice(maintenanceIndex, 1);
  }

  async list(): Promise<Maintenance[]> {
    return this.maintenances;
  }
}
