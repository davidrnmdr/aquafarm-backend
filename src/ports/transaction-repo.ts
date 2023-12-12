import { Transaction } from "../entities/transaction";

export interface TransactionRepo {
  find(id: string): Promise<Transaction>;
  add(transaction: Transaction): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<Transaction[]>;
}
