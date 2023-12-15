import { FakeEmployeeRepo } from "../../doubles/fake-employee-repo";
import { Employee } from "../../entities/employee";
import { EmployeeRepo } from "../../ports/employee-repo";

let fakeEmployeeRepo: FakeEmployeeRepo;

describe("fake employee repo", () => {
  beforeEach(() => {
    fakeEmployeeRepo = new FakeEmployeeRepo();
  });

  it("adds an employee to the repository", async () => {
    const employeeToBeAdded = new Employee(
      "david",
      "david@mail.com",
      "president"
    );

    const newId = await fakeEmployeeRepo.add(employeeToBeAdded);

    expect(newId).toBeDefined();
    expect(fakeEmployeeRepo.employees.includes(employeeToBeAdded)).toBeTruthy();
  });

  it("retrieves an employee by id", async () => {
    const employeeToBeAdded = new Employee(
      "david",
      "david@mail.com",
      "president"
    );

    const newId = await fakeEmployeeRepo.add(employeeToBeAdded);

    const employeeRetrieved = await fakeEmployeeRepo.find(newId);

    expect(employeeToBeAdded.id).toEqual(employeeRetrieved.id);
    expect(employeeToBeAdded.email).toEqual(employeeRetrieved.email);
  });

  it("deletes an employee from the repository", async () => {
    const employeeToBeAdded = new Employee(
      "david",
      "david@mail.com",
      "president"
    );

    const newId = await fakeEmployeeRepo.add(employeeToBeAdded);

    await fakeEmployeeRepo.delete(newId);

    expect(fakeEmployeeRepo.employees.includes(employeeToBeAdded)).toBeFalsy();
  });

  it("lists all employess", async () => {
    const employeeToBeAdded1 = new Employee(
      "david",
      "david@mail.com",
      "president"
    );

    const newId = await fakeEmployeeRepo.add(employeeToBeAdded1);

    const employeeToBeAdded2 = new Employee("aaron", "aaron@mail.com", "ceo");

    const newId2 = await fakeEmployeeRepo.add(employeeToBeAdded2);

    const employeesList: Employee[] = await fakeEmployeeRepo.list();

    expect(employeesList[0].id).toEqual(employeeToBeAdded1.id);
    expect(employeesList[1].id).toEqual(employeeToBeAdded2.id);
  });
});
