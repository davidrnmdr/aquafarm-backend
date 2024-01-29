import { Warning } from "../../entities/warning";
import { WarningRepo } from "../../ports/warning-repo";

import * as crypto from "crypto";

import { Tanks, Warnings } from "./models";
import { tankInstanceToObj } from "./sequelize-tank-repo";

export class SequelizeWarningRepo implements WarningRepo {
  async add(warning: Warning): Promise<string> {
    const newId = crypto.randomUUID();

    await Warnings.create({
      warningTankId: warning.tank.id,
      warningMsg: warning.msg,
      warningTemperature: warning.details.verification?.temperatureOutOfRange,
      warningOxygen: warning.details.verification?.oxygenOutOfRange,
      warningPh: warning.details.verification?.phOutOfRange,
      warningId: newId,
    });

    warning.id = newId;

    return newId;
  }

  async delete(id: string): Promise<void> {
    await Warnings.destroy({ where: { warningId: id } });
  }

  async list(): Promise<Warning[]> {
    const allWarningInstances = await Warnings.findAll();
    const allWarningObjects: Warning[] = [];

    for (let i = 0; i < allWarningInstances.length; i++) {
      allWarningObjects.push(
        await warningInstanceToObj(allWarningInstances[i])
      );
    }

    return allWarningObjects;
  }
}

export async function warningInstanceToObj(instance: any): Promise<Warning> {
  return new Warning(
    await tankInstanceToObj(
      await Tanks.findOne({
        where: { tankId: instance.dataValues.warningTankId },
      })
    ),
    instance.dataValues.warningMsg,
    {
      verification: {
        oxygenOutOfRange: instance.dataValues.warningOxygen,
        temperatureOutOfRange: instance.dataValues.warningTemperature,
        phOutOfRange: instance.dataValues.warningPh,
      },
    },
    instance.dataValues.warningId
  );
}
