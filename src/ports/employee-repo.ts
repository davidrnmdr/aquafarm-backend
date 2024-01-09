import { Employee } from "../entities/employee";

export interface EmployeeRepo {
  add(employee: Employee): Promise<string>;
  find(email: string): Promise<Employee | undefined>;
  delete(id: string): Promise<void>;
  list(): Promise<Employee[]>;
}
