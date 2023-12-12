import { Feeding } from "../entities/feeding";

export interface FeedingRepo {
  find(id: string): Promise<Feeding>;
  add(feeding: Feeding): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<Feeding[]>;
}
