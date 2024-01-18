import { FishSpecie } from "../entities/fishSpecie";

export interface FishSpecieRepo {
  add(specie: FishSpecie): Promise<string>;
  delete(id: string): Promise<void>;
}
