import { Medication } from "../entities/medication";

export interface MedicationRepo {
  add(feeding: Medication): Promise<string>;
  find(id: string): Promise<Medication | undefined>;
  delete(id: string): Promise<void>;
  list(): Promise<Medication[]>;
}
