import { Employee } from "../../../src/entities/employee";
import { SequelizeEmployeeRepo } from "../../../src/services/database/sequelize-employee-repo";

import { Employees } from "../../../src/services/database/models";

describe("sequelize employees repository", () => {
  const sequelizeEmployeeRepo = new SequelizeEmployeeRepo();

  beforeEach(async () => {
    await Employees.sync({ force: true });
  }, 20000);

  afterEach(async () => {
    await Employees.sync({ force: true });
  }, 20000);

  const employee = new Employee("david", "david@mail.com", "president", "123");
  const employee2 = new Employee("aaron", "aaron@mail.com", "manager", "321");

  it("adds a employee to the repository", async () => {
    const newId = await sequelizeEmployeeRepo.add(employee);

    expect(newId).toBeTruthy();
  });

  it("finds a employee by email", async () => {
    const newId = await sequelizeEmployeeRepo.add(employee);

    const retrievedEmployee = await sequelizeEmployeeRepo.find(employee.email);

    const shouldBeUndefined = await sequelizeEmployeeRepo.find(
      "aaron@mail.com"
    );

    expect(retrievedEmployee).toBeInstanceOf(Employee);
    expect(retrievedEmployee?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("deletes a given employee", async () => {
    const newId = await sequelizeEmployeeRepo.add(employee);

    await sequelizeEmployeeRepo.delete(newId);

    const shouldBeUndefined = await sequelizeEmployeeRepo.find(employee.email);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all employees", async () => {
    const newId = await sequelizeEmployeeRepo.add(employee);
    const newId2 = await sequelizeEmployeeRepo.add(employee2);

    const employeeList = await sequelizeEmployeeRepo.list();

    expect(employeeList[0]).toBeInstanceOf(Employee);
    expect(employeeList[0].id).toEqual(newId);
    expect(employeeList[1].id).toEqual(newId2);
  });
});
