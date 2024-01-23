import { BusinessPartner } from "../../../src/entities/businessPartner";
import { Employee } from "../../../src/entities/employee";
import { Equipment } from "../../../src/entities/equipment";
import { Maintenance } from "../../../src/entities/maintenance";
import {
  BusinessPartners,
  Employees,
  Equipments,
  Maintenances,
} from "../../../src/services/database/models";
import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";
import { SequelizeEmployeeRepo } from "../../../src/services/database/sequelize-employee-repo";
import { SequelizeEquipmentRepo } from "../../../src/services/database/sequelize-equipment-repo";
import { SequelizeMaintenanceRepo } from "../../../src/services/database/sequelize-maintenance-repo";

describe("sequelize maintenance repository", () => {
  const sequelizeMaintenanceRepo = new SequelizeMaintenanceRepo();
  const sequelizePartnerRepo = new SequelizeBusinessPartnerRepo();
  const sequelizeEquipmentRepo = new SequelizeEquipmentRepo();
  const sequelizeEmployeeRepo = new SequelizeEmployeeRepo();
  let seller: BusinessPartner;
  let sellerId: string;
  let equipment: Equipment;
  let equipmentId: string;
  let employee: Employee;
  let employeeId: string;
  let employee2: Employee;
  let employeeId2: string;
  let maintenance: Maintenance;
  let maintenance2: Maintenance;
  let newId: string;
  let newId2: string;

  beforeEach(async () => {
    await Employees.sync({ force: true });
    await BusinessPartners.sync({ force: true });
    await Equipments.sync({ force: true });
    await Maintenances.sync({ force: true });

    sellerId = await sequelizePartnerRepo.add(
      (seller = new BusinessPartner(
        198,
        "company@main.com",
        "company llc",
        "street 7, 433"
      ))
    );
    seller.id = sellerId;

    equipmentId = await sequelizeEquipmentRepo.add(
      (equipment = new Equipment("heater", "new", "room 6", seller, 0, 1900, 2))
    );
    equipment.id = equipmentId;

    employeeId = await sequelizeEmployeeRepo.add(
      (employee = new Employee("david", "david@mail.com", "president", "123"))
    );
    employee.id = employeeId;

    employeeId2 = await sequelizeEmployeeRepo.add(
      (employee2 = new Employee("aaron", "aaron@mail.com", "president", "321"))
    );
    employee2.id = employeeId2;

    newId = await sequelizeMaintenanceRepo.add(
      (maintenance = new Maintenance(equipment, employee, new Date(), 100))
    );
    maintenance.id = newId;

    newId2 = await sequelizeMaintenanceRepo.add(
      (maintenance2 = new Maintenance(equipment, employee2, new Date(), 200))
    );
    maintenance2.id = newId2;
  }, 20000);

  afterAll(async () => {
    await Employees.sync({ force: true });
    await BusinessPartners.sync({ force: true });
    await Equipments.sync({ force: true });
    await Maintenances.sync({ force: true });
  }, 20000);

  it("adds a maintenance to the repository", async () => {
    expect(newId).toBeTruthy();
  });

  it("finds a feeding by id", async () => {
    const retrievedMaintenance = await sequelizeMaintenanceRepo.find(newId);

    const shouldBeUndefined = await sequelizeMaintenanceRepo.find("12345");

    expect(retrievedMaintenance).toBeInstanceOf(Maintenance);
    expect(retrievedMaintenance?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("finds maintenances by some given employee attribute", async () => {
    const maintenancesByEmail = await sequelizeMaintenanceRepo.findByEmployee(
      "email",
      "david@mail.com"
    );

    const maintenancesByName = await sequelizeMaintenanceRepo.findByEmployee(
      "name",
      "aaron"
    );

    const maintenancesByRole = await sequelizeMaintenanceRepo.findByEmployee(
      "role",
      "president"
    );

    expect(JSON.stringify(maintenancesByEmail[0])).toEqual(
      JSON.stringify(maintenance)
    );
    expect(maintenancesByEmail[1]).toBeFalsy();

    expect(JSON.stringify(maintenancesByName[0])).toEqual(
      JSON.stringify(maintenance2)
    );
    expect(maintenancesByName[1]).toBeFalsy();

    expect(JSON.stringify(maintenancesByRole[0])).toEqual(
      JSON.stringify(maintenance)
    );
    expect(JSON.stringify(maintenancesByRole[1])).toEqual(
      JSON.stringify(maintenance2)
    );
    expect(maintenancesByRole[2]).toBeFalsy();
  }, 10000);

  it("deletes a given maintenance", async () => {
    await sequelizeMaintenanceRepo.delete(newId);

    const shouldBeUndefined = await sequelizeMaintenanceRepo.find(newId);

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all maintenances", async () => {
    const maintenanceList = await sequelizeMaintenanceRepo.list();

    expect(maintenanceList[0]).toBeInstanceOf(Maintenance);
    expect(maintenanceList[0].id).toEqual(newId);
    expect(maintenanceList[1].id).toEqual(newId2);
  });
});
