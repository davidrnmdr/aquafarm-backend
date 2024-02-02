"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_employee_repo_1 = require("../../src/doubles/fake-employee-repo");
const employee_1 = require("../../src/entities/employee");
let fakeEmployeeRepo;
describe("fake employee repo", () => {
    beforeEach(() => {
        fakeEmployeeRepo = new fake_employee_repo_1.FakeEmployeeRepo();
    });
    it("adds an employee to the repository", async () => {
        const employeeToBeAdded = new employee_1.Employee("david", "david@mail.com", "president", "123");
        const newId = await fakeEmployeeRepo.add(employeeToBeAdded);
        expect(newId).toBeDefined();
        expect(fakeEmployeeRepo.employees.includes(employeeToBeAdded)).toBeTruthy();
    });
    it("retrieves an employee by email", async () => {
        const employeeToBeAdded = new employee_1.Employee("david", "david@mail.com", "president", "123");
        const newId = await fakeEmployeeRepo.add(employeeToBeAdded);
        const employeeRetrieved = await fakeEmployeeRepo.find(employeeToBeAdded.email);
        expect(employeeToBeAdded.id).toEqual(employeeRetrieved?.id);
        expect(employeeToBeAdded.email).toEqual(employeeRetrieved?.email);
    });
    it("deletes an employee from the repository", async () => {
        const employeeToBeAdded = new employee_1.Employee("david", "david@mail.com", "president", "123");
        const newId = await fakeEmployeeRepo.add(employeeToBeAdded);
        await fakeEmployeeRepo.delete(newId);
        expect(fakeEmployeeRepo.employees.includes(employeeToBeAdded)).toBeFalsy();
    });
    it("lists all employess", async () => {
        const employeeToBeAdded1 = new employee_1.Employee("david", "david@mail.com", "president", "123");
        const newId = await fakeEmployeeRepo.add(employeeToBeAdded1);
        const employeeToBeAdded2 = new employee_1.Employee("aaron", "aaron@mail.com", "ceo", "123");
        const newId2 = await fakeEmployeeRepo.add(employeeToBeAdded2);
        const employeesList = await fakeEmployeeRepo.list();
        expect(employeesList[0].id).toEqual(employeeToBeAdded1.id);
        expect(employeesList[1].id).toEqual(employeeToBeAdded2.id);
    });
});
