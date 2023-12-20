import { Food } from "../entities/food";

export interface FoodRepo {
  add(food: Food): Promise<string>;
  find(id: string): Promise<Food | undefined>;
  delete(id: string): Promise<void>;
  list(): Promise<Food[]>;
}
