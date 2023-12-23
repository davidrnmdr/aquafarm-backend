import { Medication } from "../entities/medication";
import { MedicationRepo } from "../ports/medication-repo";
import crypto from "crypto";

export class FakeMedicationRepo implements MedicationRepo {
  medications: Medication[] = [];

  async add(medication: Medication): Promise<string> {
    const newId = crypto.randomUUID();
    medication.id = newId;

    this.medications.push(medication);

    return newId;
  }

  async find(id: string): Promise<Medication | undefined> {
    return this.medications.find((medication) => medication.id === id);
  }

  async delete(id: string): Promise<void> {
    const medicationIndex = this.medications.findIndex(
      (medication) => medication.id === id
    );

    if (medicationIndex != -1) this.medications.splice(medicationIndex, 1);
  }

  async list(): Promise<Medication[]> {
    return this.medications;
  }
}
