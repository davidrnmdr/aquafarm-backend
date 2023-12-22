import { Employee } from "../entities/employee";

export interface EmployeeRepo {
  find(email: string): Promise<Employee | undefined>;
  add(employee: Employee): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<Employee[]>;
}
