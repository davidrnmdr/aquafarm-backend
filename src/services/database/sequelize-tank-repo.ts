import { Tank } from "../../entities/tank";
import { TankRepo } from "../../ports/tank-repo";
import { FishSpecies, Tanks } from "./models";
import { specieInstanceToObj } from "./sequelize-fishSpecie-repo";

import crypto from "crypto";

export class SequelizeTankRepo implements TankRepo {
  async add(tank: Tank): Promise<string> {
    const newId = crypto.randomUUID();

    await Tanks.create({
      tankSpecieId: tank.fishSpecie.id,
      tankType: tank.type,
      tankLocation: tank.location,
      tankStatus: tank.status,
      tankCapacity: tank.capacity,
      tankId: newId,
    });

    return newId;
  }

  async find(id: string): Promise<Tank | undefined> {
    return undefined;
  }

  async findBy(
    attribute: "type" | "capacity" | "location" | "status",
    attributeValue: string | number
  ): Promise<Tank[]> {
    return [];
  }

  async updateStatus(id: string, status: number): Promise<void> {}

  async delete(id: string): Promise<void> {}

  async list(): Promise<Tank[]> {
    return [];
  }
}

export async function tankInstanceToObj(instance: any): Promise<Tank> {

  return new Tank(
    specieInstanceToObj(
      await FishSpecies.findOne({
        where: { specieId: instance.dataValues.tankSpecieId },
      })
    ),
    instance.dataValues.tankType,
    instance.dataValues.tankLocation,
    instance.dataValues.tankStatus,
    instance.dataValues.tankCapacity,
    instance.dataValues.tankId
  );
}
