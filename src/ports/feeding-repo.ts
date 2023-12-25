import { Feeding } from "../entities/feeding";

export interface FeedingRepo {
  add(feeding: Feeding): Promise<string>;
  find(id: string): Promise<Feeding | undefined>;
  findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Feeding[]>;
  delete(id: string): Promise<void>;
  list(): Promise<Feeding[]>;
}
