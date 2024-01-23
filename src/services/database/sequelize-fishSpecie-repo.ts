import { FishSpecie } from "../../entities/fishSpecie";
import { FishSpecieRepo } from "../../ports/fishSpecie-repo";

import crypto from "crypto";
import { FishSpecies } from "./models";

export class SequelizeFishSpecieRepo implements FishSpecieRepo {
  async add(specie: FishSpecie): Promise<string> {
    const newId = crypto.randomUUID();

    await FishSpecies.create({
      specieName: specie.name,
      specieFoodType: specie.foodType,
      specieMinTemperature: specie.temperatureRange.min,
      specieMaxTemperature: specie.temperatureRange.max,
      specieMinOxygen: specie.oxygenRange.min,
      specieMaxOxygen: specie.oxygenRange.max,
      specieMinPh: specie.phRange.min,
      specieMaxPh: specie.phRange.max,
      specieId: newId,
    });

    specie.id = newId;

    return newId;
  }

  async delete(id: string): Promise<void> {}
}

export function specieInstanceToObj(instance: any): FishSpecie {
  return new FishSpecie(
    instance.dataValues.specieName,
    instance.dataValues.specieFoodType,
    {
      min: instance.dataValues.specieMinTemperature,
      max: instance.dataValues.specieMaxTemperature,
    },
    {
      min: instance.dataValues.specieMinOxygen,
      max: instance.dataValues.specieMaxOxygen,
    },
    {
      min: instance.dataValues.specieMinPh,
      max: instance.dataValues.specieMaxPh,
    },
    instance.dataValues.specieId
  );
}
