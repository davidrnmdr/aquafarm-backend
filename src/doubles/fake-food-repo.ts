import { Food } from "../entities/food";
import { FoodRepo } from "../ports/food-repo";
import crypto from "crypto";

export class FakeFoodRepo implements FoodRepo {
  foods: Food[] = [];

  async add(food: Food): Promise<string> {
    const newId = crypto.randomUUID();
    food.id = newId;
    this.foods.push(food);

    return newId;
  }

  async find(id: string): Promise<Food | undefined> {
    return this.foods.find((food) => food.id == id);
  }

  async delete(id: string): Promise<void> {
    const foodIndex = this.foods.findIndex((food) => food.id === id);

    if (foodIndex != -1) this.foods.splice(foodIndex, 1);
  }

  async updateQuantity(id: string, quantity: number): Promise<void> {
    const foodIndex = this.foods.findIndex((food) => food.id === id);

    if (foodIndex != -1) this.foods[foodIndex].quantity = quantity;
  }

  async list(): Promise<Food[]> {
    return this.foods;
  }
}
