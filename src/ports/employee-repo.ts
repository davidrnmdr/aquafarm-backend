import { Employee } from "../employee";

export interface EmployeeRepo {
  find(id: string): Promise<Employee>;
  add(employee: Employee): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<Employee[]>;
}
