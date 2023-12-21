import { Purchase } from "../entities/purchase";
import { Sale } from "../entities/sale";
import { TransactionRepo } from "../ports/transaction-repo";
import crypto from "crypto";

export class FakeTransactionRepo implements TransactionRepo {
  sales: Sale[] = [];
  purchases: Purchase[] = [];

  async add(transaction: Sale | Purchase): Promise<string> {
    const newId = crypto.randomUUID();

    transaction.id = newId;

    if (transaction instanceof Sale) {
      this.sales.push(transaction);
    } else this.purchases.push(transaction);

    return newId;
  }

  async find(
    type: "sale" | "purchase",
    id: string
  ): Promise<Sale | Purchase | undefined> {
    if (type === "sale") {
      return this.sales.find((sale) => sale.id === id);
    } else return this.purchases.find((purchase) => purchase.id === id);
  }

  async delete(type: "sale" | "purchase", id: string): Promise<void> {}

  async list(
    type?: "sale" | "purchase" | undefined
  ): Promise<Sale[] | Purchase[]> {
    if (type === "sale") {
      return this.sales;
    } else return this.purchases;
  }
}
