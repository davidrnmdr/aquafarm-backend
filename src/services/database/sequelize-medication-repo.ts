import { MedicationRepo } from "../../ports/medication-repo";

import * as crypto from "crypto";


import { Employees } from "./models";
import { Tanks } from "./models";
import { Treatments } from "./models";
import { Medications } from "./models";

import { Treatment } from "../../entities/treatment";
import { Medication } from "../../entities/medication";
import { tankInstanceToObj } from "./sequelize-tank-repo";
import { employeeInstanceToObj } from "./sequelize-employee-repo";
import { treatmentInstanceToObj } from "./sequelize-treatment-repo";

import { Op } from "sequelize";

export class SequelizeMedicationRepo implements MedicationRepo {
  async add(medication: Medication): Promise<string> {
    const newId = crypto.randomUUID();

    await Medications.create({
      medicationEmployeeId: medication.employee.id,
      medicationTankId: medication.tank.id,
      medicationTreatmentId: medication.treatment.id,
      medicationQuantity: medication.quantity,
      medicationDate: new Date(),
      medicationId: newId,
    });

    medication.id = newId;

    return newId;
  }

  async find(id: string): Promise<Medication | undefined> {
    const medication = await Medications.findOne({
      where: { medicationId: id },
    });
    return medication ? await medicationInstanceToObj(medication) : undefined;
  }

  async findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Medication[]> {
    let employeeIds: string[] = [];
    const medicationObjects: Medication[] = [];

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

    const medicationInstances = await Medications.findAll({
      where: {
        medicationEmployeeId: {
          [Op.in]: employeeIds,
        },
      },
    });

    for (let i = 0; i < medicationInstances.length; i++) {
      medicationObjects.push(
        await medicationInstanceToObj(medicationInstances[i])
      );
    }

    return medicationObjects;
  }

  async delete(id: string): Promise<void> {
    await Medications.destroy({ where: { medicationId: id } });
  }

  async list(): Promise<Medication[]> {
    const allMedicationInstances = await Medications.findAll();
    const allMedicationObjects: Medication[] = [];

    for (let i = 0; i < allMedicationInstances.length; i++) {
      allMedicationObjects.push(
        await medicationInstanceToObj(allMedicationInstances[i])
      );
    }

    return allMedicationObjects;
  }
}

async function medicationInstanceToObj(instance: any): Promise<Medication> {
  return new Medication(
    employeeInstanceToObj(
      await Employees.findOne({
        where: { employeeId: instance.dataValues.medicationEmployeeId },
      })
    ),
    await tankInstanceToObj(
      await Tanks.findOne({
        where: { tankId: instance.dataValues.medicationTankId },
      })
    ),
    await treatmentInstanceToObj(
      await Treatments.findOne({
        where: { treatmentId: instance.dataValues.medicationTreatmentId },
      })
    ),
    instance.dataValues.medicationQuantity,
    instance.dataValues.medicationDate,
    instance.dataValues.medicationId
  );
}
