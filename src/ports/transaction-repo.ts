import { Sale } from "../entities/sale";
import { Purchase } from "../entities/purchase";

export interface TransactionRepo {
  add(transaction: Sale | Purchase): Promise<string>;
  find(
    type: "sale" | "purchase",
    id: string
  ): Promise<Sale | Purchase | undefined>;
  delete(type: "sale" | "purchase", id: string): Promise<void>;
  list(type?: "sale" | "purchase"): Promise<Sale[] | Purchase[]>;
}
