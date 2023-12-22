import { Tank } from "../entities/tank";
import { TankRepo } from "../ports/tank-repo";
import crypto from "crypto";

export class FakeTankRepo implements TankRepo {
  tanks: Tank[] = [];

  async add(tank: Tank): Promise<string> {
    const newId = crypto.randomUUID();
    tank.id = newId;

    this.tanks.push(tank);
    return newId;
  }

  async find(id: string): Promise<Tank | undefined> {
    return this.tanks.find((tank) => tank.id === id);
  }

  async findBy(
    attribute: "type" | "capacity" | "location" | "status",
    attributeValue: string | number
  ): Promise<Tank[]> {
    return this.tanks.filter((tank) => tank[attribute] === attributeValue);
  }

  async updateStatus(id: string, status: number): Promise<void> {
    const tankIndex = this.tanks.findIndex((tank) => tank.id === id);

    if (tankIndex != -1) this.tanks[tankIndex].status = status;
  }

  async delete(id: string): Promise<void> {
    const tankIndex = this.tanks.findIndex((tank) => tank.id === id);

    if (tankIndex != -1) this.tanks.splice(tankIndex, 1);
  }

  async list(): Promise<Tank[]> {
    return this.tanks;
  }
}
