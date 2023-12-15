import { Food } from "../entities/food";
import { Treatment } from "../entities/treatment";

export type Produtcs = {
  foods: [{ foodItem: Food; quantity?: number }];
  treatments: [{ treatmentItem: Treatment; quantity?: number }];
};
