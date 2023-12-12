import { Food } from "../entities/food";
import { Treatment } from "../entities/treatment";

export type Produtcs = {
  foods: [{ food: Food; quantity?: number }];
  treatments: [{ treatment: Treatment; quantity?: number }];
};
