import { TankVerification } from "../../entities/tankVerification";
import { TankVerificationRepo } from "../../ports/tankVerification-repo";

import crypto from "crypto";
import { Employees, Tanks, Verifications } from "./models";
import { tankInstanceToObj } from "./sequelize-tank-repo";
import { employeeInstanceToObj } from "./sequelize-employee-repo";
import { Op } from "sequelize";

export class SequelizeTankVerificationRepo implements TankVerificationRepo {
  async add(tankVerification: TankVerification): Promise<string> {
    const newId = crypto.randomUUID();

    await Verifications.create({
      verificationEmployeeId: tankVerification.employee.id,
      verificationTankId: tankVerification.tank.id,
      verificationTemperature: tankVerification.temperature,
      verificationOxygen: tankVerification.oxygen,
      verificationPh: tankVerification.ph,
      verificationDate: tankVerification.date,
      verificationId: newId,
    });

    tankVerification.id = newId;

    return newId;
  }

  async find(id: string): Promise<TankVerification | undefined> {
    const verification = await Verifications.findOne({
      where: { verificationId: id },
    });
    return verification
      ? await verificationInstanceToObj(verification)
      : undefined;
  }

  async findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<TankVerification[]> {
    let employeeIds: string[] = [];
    const verificationObjects: TankVerification[] = [];

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

    const verificationInstances = await Verifications.findAll({
      where: {
        verificationEmployeeId: {
          [Op.in]: employeeIds,
        },
      },
    });

    for (let i = 0; i < verificationInstances.length; i++) {
      verificationObjects.push(
        await verificationInstanceToObj(verificationInstances[i])
      );
    }

    return verificationObjects;
  }

  async delete(id: string): Promise<void> {
    await Verifications.destroy({ where: { verificationId: id } });
  }

  async list(): Promise<TankVerification[]> {
    const allVerificationInstances = await Verifications.findAll();
    const allVerificationObjects: TankVerification[] = [];

    for (let i = 0; i < allVerificationInstances.length; i++) {
      allVerificationObjects.push(
        await verificationInstanceToObj(allVerificationInstances[i])
      );
    }

    return allVerificationObjects;
  }
}

async function verificationInstanceToObj(
  instance: any
): Promise<TankVerification> {
  return new TankVerification(
    await tankInstanceToObj(
      await Tanks.findOne({
        where: { tankId: instance.dataValues.verificationTankId },
      })
    ),
    employeeInstanceToObj(
      await Employees.findOne({
        where: { employeeId: instance.dataValues.verificationEmployeeId },
      })
    ),
    instance.dataValues.verificationTemperature,
    instance.dataValues.verificationOxygen,
    instance.dataValues.verificationPh,
    instance.dataValues.verificationDate,
    instance.dataValues.verificationId
  );
}
