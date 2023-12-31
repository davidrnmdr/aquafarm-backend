import { Employee } from "../entities/employee";
import { EmployeeRepo } from "../ports/employee-repo";
import crypto from "crypto";

export class FakeEmployeeRepo implements EmployeeRepo {
  employees: Employee[] = [];

  async find(email: string): Promise<Employee | undefined> {
    return this.employees.find((employee) => employee.email === email);
  }

  async add(employee: Employee): Promise<string> {
    const newId = crypto.randomUUID();
    employee.id = newId;

    this.employees.push(employee);
    return newId;
  }

  async delete(id: string): Promise<void> {
    const employeeIndex = this.employees.findIndex(
      (employee) => employee.id === id
    );

    if (employeeIndex != -1) this.employees.splice(employeeIndex, 1);
  }

  async list(): Promise<Employee[]> {
    return this.employees;
  }
}
