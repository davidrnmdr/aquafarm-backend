import { Treatment } from "../entities/treatment";
import { TreatmentRepo } from "../ports/treatment-repo";
import crypto from "crypto";

export class FakeTreatmentRepo implements TreatmentRepo {
  treatments: Treatment[] = [];

  async add(treatment: Treatment): Promise<string> {
    const newId = crypto.randomUUID();

    treatment.id = newId;
    this.treatments.push(treatment);

    return newId;
  }

  async find(id: string): Promise<Treatment | undefined> {
    return this.treatments.find((treatment) => treatment.id === id);
  }

  async updateStorage(id: string, storage: number): Promise<void> {
    const treatmentIndex = this.treatments.findIndex(
      (treatment) => treatment.id === id
    );

    if (treatmentIndex != -1)
      this.treatments[treatmentIndex].quantity = storage;
  }

  async delete(id: string): Promise<void> {
    const treatmentIndex = this.treatments.findIndex(
      (treatment) => treatment.id === id
    );

    if (treatmentIndex != -1) this.treatments.splice(treatmentIndex, 1);
  }

  async list(): Promise<Treatment[]> {
    return this.treatments;
  }
}
