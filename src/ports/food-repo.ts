import { Food } from "../entities/food";

export interface FoodRepo {
  add(food: Food): Promise<string>;
  find(id: string): Promise<Food | undefined>;
  updateStorage(id: string, quantity: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Food[]>;
}
