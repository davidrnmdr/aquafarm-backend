import { EmployeeRepo } from "../../ports/employee-repo";

import crypto from "crypto";

import { Employees } from "./models";
import { Employee } from "../../entities/employee";

export class SequelizeEmployeeRepo implements EmployeeRepo {
  async add(employee: Employee): Promise<string> {
    const newId = crypto.randomUUID();

    await Employees.create({
      employeeName: employee.name,
      employeeEmail: employee.email,
      employeeRole: employee.role,
      employeePassword: employee.password,
      employeeId: newId,
    });

    return newId;
  }

  async find(email: string): Promise<Employee | undefined> {
    const employee = await Employees.findOne({
      where: { employeeEmail: email },
    });
    return employee ? employeeInstanceToObj(employee) : undefined;
  }

  async delete(id: string): Promise<void> {
    await Employees.destroy({ where: { employeeId: id } });
  }

  async list(): Promise<Employee[]> {
    return (await Employees.findAll()).map(employeeInstanceToObj);
  }
}

export function employeeInstanceToObj(instance: any): Employee {
  return new Employee(
    instance.dataValues.employeeName,
    instance.dataValues.employeeEmail,
    instance.dataValues.employeeRole,
    instance.dataValues.employeePassword,
    instance.dataValues.employeeId
  );
}
