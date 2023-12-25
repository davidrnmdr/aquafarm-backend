import { Sale } from "../entities/sale";
import { Purchase } from "../entities/purchase";

export interface TransactionRepo {
  add(transaction: Sale | Purchase): Promise<string>;
  find(
    type: "sale" | "purchase",
    id: string
  ): Promise<Sale | Purchase | undefined>;
  findByEmployee(
    type: "sale" | "purchase",
    attribute: "name" | "email" | "role",
    value: string
  ): Promise<Sale[] | Purchase[]>;
  list(type?: "sale" | "purchase"): Promise<Sale[] | Purchase[]>;
}
