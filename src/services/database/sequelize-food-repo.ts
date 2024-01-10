import { FoodRepo } from "../../ports/food-repo";

import crypto from "crypto";

import { Foods } from "./models";
import { Food } from "../../entities/food";

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

    return newId;
  }

  async find(id: string): Promise<Food | undefined> {
    const food = await Foods.findOne({ where: { foodId: id } });
    return food ? foodInstanceToObj(food) : undefined;
  }

  async updateStorage(id: string, quantity: number): Promise<void> {
    await Foods.update({ foodQuantity: quantity }, { where: { foodId: id } });
  }

  async delete(id: string): Promise<void> {
    await Foods.destroy({ where: { foodId: id } });
  }

  async list(): Promise<Food[]> {
    return (await Foods.findAll()).map(foodInstanceToObj);
  }
}

function foodInstanceToObj(instance: any): Food {
  return new Food(
    instance.dataValues.foodType,
    instance.dataValues.foodQuantity,
    instance.dataValues.foodCost,
    instance.dataValues.foodExpirationDate,
    instance.dataValues.foodSellerId,
    instance.dataValues.foodId
  );
}
