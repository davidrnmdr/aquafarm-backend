import { Food } from "../food";
import { Treatment } from "../treatment";

export type Produtcs = {
  food: [{ food: Food; quantity: number }];
  treatment: [{ treatment: Treatment; quantity: number }];
};
