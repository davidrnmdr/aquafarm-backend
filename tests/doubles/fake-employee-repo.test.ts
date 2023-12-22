import { FakeEmployeeRepo } from "../../src/doubles/fake-employee-repo";
import { Employee } from "../../src/entities/employee";

let fakeEmployeeRepo: FakeEmployeeRepo;

describe("fake employee repo", () => {
  beforeEach(() => {
    fakeEmployeeRepo = new FakeEmployeeRepo();
  });

  it("adds an employee to the repository", async () => {
    const employeeToBeAdded = new Employee(
      "david",
      "david@mail.com",
      "president",
      "123"
    );

    const newId = await fakeEmployeeRepo.add(employeeToBeAdded);

    expect(newId).toBeDefined();
    expect(fakeEmployeeRepo.employees.includes(employeeToBeAdded)).toBeTruthy();
  });

  it("retrieves an employee by email", async () => {
    const employeeToBeAdded = new Employee(
      "david",
      "david@mail.com",
      "president",
      "123"
    );

    const newId = await fakeEmployeeRepo.add(employeeToBeAdded);

    const employeeRetrieved = await fakeEmployeeRepo.find(
      employeeToBeAdded.email
    );

    expect(employeeToBeAdded.id).toEqual(employeeRetrieved?.id);
    expect(employeeToBeAdded.email).toEqual(employeeRetrieved?.email);
  });

  it("deletes an employee from the repository", async () => {
    const employeeToBeAdded = new Employee(
      "david",
      "david@mail.com",
      "president",
      "123"
    );

    const newId = await fakeEmployeeRepo.add(employeeToBeAdded);

    await fakeEmployeeRepo.delete(newId);

    expect(fakeEmployeeRepo.employees.includes(employeeToBeAdded)).toBeFalsy();
  });

  it("lists all employess", async () => {
    const employeeToBeAdded1 = new Employee(
      "david",
      "david@mail.com",
      "president",
      "123"
    );

    const newId = await fakeEmployeeRepo.add(employeeToBeAdded1);

    const employeeToBeAdded2 = new Employee(
      "aaron",
      "aaron@mail.com",
      "ceo",
      "123"
    );

    const newId2 = await fakeEmployeeRepo.add(employeeToBeAdded2);

    const employeesList: Employee[] = await fakeEmployeeRepo.list();

    expect(employeesList[0].id).toEqual(employeeToBeAdded1.id);
    expect(employeesList[1].id).toEqual(employeeToBeAdded2.id);
  });
});
