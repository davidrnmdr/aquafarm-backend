import { Food } from "../entities/food";

export interface FoodRepo {
  find(id: string): Promise<Food>;
  add(food: Food): Promise<string>;
  updateStorage(id: string, storage: number): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Food[]>;
}
