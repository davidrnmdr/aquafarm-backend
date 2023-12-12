import { Treatment } from "../entities/treatment";

export interface TreatmentRepo {
  find(id: string): Promise<Treatment>;
  add(treatment: Treatment): Promise<string>;
  updateStorage(id: string, storage: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Treatment[]>;
}
