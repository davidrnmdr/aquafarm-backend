"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../../../src/entities/employee");
const sequelize_employee_repo_1 = require("../../../src/services/database/sequelize-employee-repo");
const models_1 = require("../../../src/services/database/models");
describe("sequelize employees repository", () => {
    const sequelizeEmployeeRepo = new sequelize_employee_repo_1.SequelizeEmployeeRepo();
    let newId;
    let newId2;
    const employee = new employee_1.Employee("david", "david@mail.com", "president", "123");
    const employee2 = new employee_1.Employee("aaron", "aaron@mail.com", "manager", "321");
    beforeEach(async () => {
        await models_1.Employees.sync({ force: true });
        newId = await sequelizeEmployeeRepo.add(employee);
        newId2 = await sequelizeEmployeeRepo.add(employee2);
    }, 20000);
    afterEach(async () => {
        await models_1.Employees.sync({ force: true });
    }, 20000);
    it("adds a employee to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("finds a employee by email", async () => {
        const retrievedEmployee = await sequelizeEmployeeRepo.find(employee.email);
        const shouldBeUndefined = await sequelizeEmployeeRepo.find("aaron2@mail.com");
        expect(retrievedEmployee).toBeInstanceOf(employee_1.Employee);
        expect(retrievedEmployee?.id).toEqual(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("deletes a given employee", async () => {
        await sequelizeEmployeeRepo.delete(newId);
        const shouldBeUndefined = await sequelizeEmployeeRepo.find(employee.email);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("lists all employees", async () => {
        const employeeList = await sequelizeEmployeeRepo.list();
        expect(employeeList[0]).toBeInstanceOf(employee_1.Employee);
        expect(employeeList[0].id).toEqual(newId);
        expect(employeeList[1].id).toEqual(newId2);
    });
});
