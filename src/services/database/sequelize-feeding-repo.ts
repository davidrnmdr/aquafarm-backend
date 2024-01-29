import { FeedingRepo } from "../../ports/feeding-repo";

import * as crypto from "crypto";


import { Employees } from "./models";
import { Tanks } from "./models";
import { Foods } from "./models";
import { Feedings } from "./models";

import { Food } from "../../entities/food";
import { Feeding } from "../../entities/feeding";
import { tankInstanceToObj } from "./sequelize-tank-repo";
import { employeeInstanceToObj } from "./sequelize-employee-repo";
import { foodInstanceToObj } from "./sequelize-food-repo";

import { Op } from "sequelize";

export class SequelizeFeedingRepo implements FeedingRepo {
  async add(feeding: Feeding): Promise<string> {
    const newId = crypto.randomUUID();

    await Feedings.create({
      feedingEmployeeId: feeding.employee.id,
      feedingTankId: feeding.tank.id,
      feedingFoodId: feeding.food.id,
      feedingQuantity: feeding.quantity,
      feedingDate: new Date(),
      feedingId: newId,
    });

    feeding.id = newId;

    return newId;
  }

  async find(id: string): Promise<Feeding | undefined> {
    const feeding = await Feedings.findOne({ where: { feedingId: id } });
    return feeding ? await feedingInstanceToObj(feeding) : undefined;
  }

  async findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Feeding[]> {
    let employeeIds: string[] = [];
    const feedingObjects: Feeding[] = [];

    switch (attribute) {
      case "email":
        employeeIds = (
          await Employees.findAll({ where: { employeeEmail: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;

      case "name":
        employeeIds = (
          await Employees.findAll({ where: { employeeName: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;

      case "role":
        employeeIds = (
          await Employees.findAll({ where: { employeeRole: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;
    }

    const feedingInstances = await Feedings.findAll({
      where: {
        feedingEmployeeId: {
          [Op.in]: employeeIds,
        },
      },
    });

    for (let i = 0; i < feedingInstances.length; i++) {
      feedingObjects.push(await feedingInstanceToObj(feedingInstances[i]));
    }

    return feedingObjects;
  }

  async delete(id: string): Promise<void> {
    await Feedings.destroy({ where: { feedingId: id } });
  }

  async list(): Promise<Feeding[]> {
    const allFeedingInstances = await Feedings.findAll();
    const allFeedingObjects: Feeding[] = [];

    for (let i = 0; i < allFeedingInstances.length; i++) {
      allFeedingObjects.push(
        await feedingInstanceToObj(allFeedingInstances[i])
      );
    }

    return allFeedingObjects;
  }
}

async function feedingInstanceToObj(instance: any): Promise<Feeding> {
  return new Feeding(
    employeeInstanceToObj(
      await Employees.findOne({
        where: { employeeId: instance.dataValues.feedingEmployeeId },
      })
    ),
    await tankInstanceToObj(
      await Tanks.findOne({
        where: { tankId: instance.dataValues.feedingTankId },
      })
    ),
    await foodInstanceToObj(
      await Foods.findOne({
        where: { foodId: instance.dataValues.feedingFoodId },
      })
    ),
    instance.dataValues.feedingQuantity,
    instance.dataValues.feedingDate,
    instance.dataValues.feedingId
  );
}
