import { Transaction } from "../transaction";

export interface EmployeeRepo {
  find(id: string): Promise<Transaction>;
  add(transaction: Transaction): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<Transaction[]>;
}
