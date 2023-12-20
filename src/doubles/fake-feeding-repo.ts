import { Feeding } from "../entities/feeding";
import { FeedingRepo } from "../ports/feeding-repo";
import crypto from "crypto";

export class FakeFeedingRepo implements FeedingRepo {
  feedings: Feeding[] = [];

  async add(feeding: Feeding): Promise<string> {
    const newId = crypto.randomUUID();
    feeding.id = newId;

    this.feedings.push(feeding);

    return newId;
  }

  async find(id: string): Promise<Feeding | undefined> {
    return this.feedings.find((feeding) => feeding.id === id);
  }

  async delete(id: string): Promise<void> {
    const feedingIndex = this.feedings.findIndex(
      (feeding) => feeding.id === id
    );

    if (feedingIndex != -1) this.feedings.splice(feedingIndex, 1);
  }

  async list(): Promise<Feeding[]> {
    return this.feedings;
  }
}
