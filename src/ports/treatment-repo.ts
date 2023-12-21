import { Treatment } from "../entities/treatment";

export interface TreatmentRepo {
  add(treatment: Treatment): Promise<string>;
  find(id: string): Promise<Treatment | undefined>;
  updateStorage(id: string, storage: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Treatment[]>;
}
