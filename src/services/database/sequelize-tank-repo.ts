import { Model } from "sequelize";
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
    const tank = await Tanks.findOne({ where: { tankId: id } });
    return tank ? await tankInstanceToObj(tank) : undefined;
  }

  async findBy(
    attribute: "type" | "capacity" | "location" | "status",
    attributeValue: string | number
  ): Promise<Tank[]> {
    let tankInstances: Model<any, any>[];
    const tankObjects: Tank[] = [];

    switch (attribute) {
      case "type":
        tankInstances = await Tanks.findAll({
          where: { tankType: attributeValue },
        });
        break;

      case "capacity":
        tankInstances = await Tanks.findAll({
          where: { tankCapacity: attributeValue },
        });
        break;

      case "location":
        tankInstances = await Tanks.findAll({
          where: { tankLocation: attributeValue },
        });
        break;

      case "status":
        tankInstances = await Tanks.findAll({
          where: { tankStatus: attributeValue },
        });
        break;
    }

    for (let i = 0; i < tankInstances.length; i++) {
      tankObjects.push(await tankInstanceToObj(tankInstances[i]));
    }

    return tankObjects;
  }

  async updateStatus(id: string, status: number): Promise<void> {
    await Tanks.update({ tankStatus: status }, { where: { tankId: id } });
  }

  async delete(id: string): Promise<void> {
    await Tanks.destroy({ where: { tankId: id } });
  }

  async list(): Promise<Tank[]> {
    const allTankInstances = await Tanks.findAll();
    const allTankObjects: Tank[] = [];

    for (let i = 0; i < allTankInstances.length; i++) {
      allTankObjects.push(await tankInstanceToObj(allTankInstances[i]));
    }

    return allTankObjects;
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
