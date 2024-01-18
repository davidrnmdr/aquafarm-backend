import { FishSpecie } from "../entities/fishSpecie";
import { FishSpecieRepo } from "../ports/fishSpecie-repo";

import crypto from "crypto";

export class FakeFishSpecieRepo implements FishSpecieRepo {
  species: FishSpecie[] = [];

  async add(specie: FishSpecie): Promise<string> {
    const newId = crypto.randomUUID();
    specie.id = newId;

    this.species.push(specie);

    return newId;
  }

  async delete(id: string): Promise<void> {
    const specieIndex = this.species.findIndex((specie) => specie.id === id);

    if (specieIndex != -1) this.species.splice(specieIndex, 1);
  }
}
