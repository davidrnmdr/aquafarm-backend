import { Sale } from "../entities/sale";
import { Purchase } from "../entities/purchase";

export interface TransactionRepo {
  add(transaction: Sale | Purchase): Promise<string>;
  find(
    type: "sale" | "purchase",
    id: string
  ): Promise<Sale | Purchase | undefined>;
  list(type?: "sale" | "purchase"): Promise<Sale[] | Purchase[]>;
}
