import { Sale } from "../entities/sale";
import { Purchase } from "../entities/purchase";

export interface TransactionRepo {
  find(type: "sale" | "purchase", id: string): Promise<Sale | Purchase>;
  add(type: "sale" | "purchase", transaction: Sale): Promise<string>;
  delete(type: "sale" | "purchase", id: string): Promise<void>;
  list(type?: "sale" | "purchase"): Promise<Sale[] | Purchase[]>;
}
