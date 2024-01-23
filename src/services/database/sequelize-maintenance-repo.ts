import { Op } from "sequelize";
import { Maintenance } from "../../entities/maintenance";
import { MaintenanceRepo } from "../../ports/maintenance-repo";
import { Employees, Equipments, Maintenances } from "./models";
import { employeeInstanceToObj } from "./sequelize-employee-repo";
import { equipmentInstanceToObj } from "./sequelize-equipment-repo";

import crypto from "crypto";

export class SequelizeMaintenanceRepo implements MaintenanceRepo {
  async add(maintenance: Maintenance): Promise<string> {
    const newId = crypto.randomUUID();

    await Maintenances.create({
      maintenanceEmployeeId: maintenance.employee.id,
      maintenanceEquipmentId: maintenance.equipment.id,
      maintenanceDate: maintenance.date,
      maintenanceCost: maintenance.cost,
      maintenanceId: newId,
    });

    maintenance.id = newId;

    return newId;
  }

  async find(id: string): Promise<Maintenance | undefined> {
    const maintenance = await Maintenances.findOne({
      where: { maintenanceId: id },
    });
    return maintenance
      ? await maintenanceInstanceToObj(maintenance)
      : undefined;
  }

  async findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Maintenance[]> {
    let employeeIds: string[] = [];
    const maintenanceObjects: Maintenance[] = [];

    switch (attribute) {
      case "email":
        employeeIds = (
          await Employees.findAll({ where: { employeeEmail: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;

      case "name":
        employeeIds = (
          await Employees.findAll({ where: { employeeName: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;

      case "role":
        employeeIds = (
          await Employees.findAll({ where: { employeeRole: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;
    }

    const maintenanceInstances = await Maintenances.findAll({
      where: {
        maintenanceEmployeeId: {
          [Op.in]: employeeIds,
        },
      },
    });

    for (let i = 0; i < maintenanceInstances.length; i++) {
      maintenanceObjects.push(
        await maintenanceInstanceToObj(maintenanceInstances[i])
      );
    }

    return maintenanceObjects;
  }

  async delete(id: string): Promise<void> {
    await Maintenances.destroy({ where: { maintenanceId: id } });
  }

  async list(): Promise<Maintenance[]> {
    const allMaintenanceInstances = await Maintenances.findAll();
    const allMaintenanceObjects: Maintenance[] = [];

    for (let i = 0; i < allMaintenanceInstances.length; i++) {
      allMaintenanceObjects.push(
        await maintenanceInstanceToObj(allMaintenanceInstances[i])
      );
    }

    return allMaintenanceObjects;
  }
}

async function maintenanceInstanceToObj(instance: any): Promise<Maintenance> {
  return new Maintenance(
    await equipmentInstanceToObj(
      await Equipments.findOne({
        where: { equipmentId: instance.dataValues.maintenanceEquipmentId },
      })
    ),
    employeeInstanceToObj(
      await Employees.findOne({
        where: { employeeId: instance.dataValues.maintenanceEmployeeId },
      })
    ),
    instance.dataValues.maintenanceDate,
    instance.dataValues.maintenanceCost,
    instance.dataValues.maintenanceId
  );
}
