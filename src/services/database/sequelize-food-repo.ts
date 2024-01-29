import { FoodRepo } from "../../ports/food-repo";

import * as crypto from "crypto";


import { BusinessPartners, Foods } from "./models";
import { Food } from "../../entities/food";
import { partnerInstanceToObj } from "./sequelize-businessPartner-repo";

export class SequelizeFoodRepo implements FoodRepo {
  async add(food: Food): Promise<string> {
    const newId = crypto.randomUUID();

    await Foods.create({
      foodType: food.type,
      foodQuantity: food.quantity,
      foodCost: food.cost,
      foodExpirationDate: food.expirationDate,
      foodSellerId: food.seller.id,
      foodId: newId,
    });

    food.id = newId;

    return newId;
  }

  async find(id: string): Promise<Food | undefined> {
    const food = await Foods.findOne({ where: { foodId: id } });
    return food ? await foodInstanceToObj(food) : undefined;
  }

  async updateStorage(id: string, quantity: number): Promise<void> {
    await Foods.update({ foodQuantity: quantity }, { where: { foodId: id } });
  }

  async delete(id: string): Promise<void> {
    await Foods.destroy({ where: { foodId: id } });
  }

  async list(): Promise<Food[]> {
    const allFoodInstances = await Foods.findAll();
    const allFoodObjects: Food[] = [];

    for (let i = 0; i < allFoodInstances.length; i++) {
      allFoodObjects.push(await foodInstanceToObj(allFoodInstances[i]));
    }

    return allFoodObjects;
  }
}

export async function foodInstanceToObj(instance: any): Promise<Food> {
  return new Food(
    instance.dataValues.foodType,
    instance.dataValues.foodQuantity,
    instance.dataValues.foodCost,
    instance.dataValues.foodExpirationDate,
    partnerInstanceToObj(
      await BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.foodSellerId },
      })
    ),
    instance.dataValues.foodId
  );
}
