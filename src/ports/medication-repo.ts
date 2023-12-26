import { Medication } from "../entities/medication";

export interface MedicationRepo {
  add(medication: Medication): Promise<string>;
  find(id: string): Promise<Medication | undefined>;
  findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Medication[]>;
  delete(id: string): Promise<void>;
  list(): Promise<Medication[]>;
}
