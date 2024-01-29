import { TreatmentRepo } from "../../ports/treatment-repo";

import * as crypto from "crypto";


import { BusinessPartners, Treatments } from "./models";
import { Treatment } from "../../entities/treatment";
import { partnerInstanceToObj } from "./sequelize-businessPartner-repo";

export class SequelizeTreatmentRepo implements TreatmentRepo {
  async add(treatment: Treatment): Promise<string> {
    const newId = crypto.randomUUID();

    await Treatments.create({
      treatmentName: treatment.name,
      treatmentQuantity: treatment.quantity,
      treatmentCost: treatment.cost,
      treatmentExpirationDate: treatment.expirationDate,
      treatmentSellerId: treatment.seller.id,
      treatmentId: newId,
    });

    treatment.id = newId;

    return newId;
  }

  async find(id: string): Promise<Treatment | undefined> {
    const treatment = await Treatments.findOne({ where: { treatmentId: id } });
    return treatment ? treatmentInstanceToObj(treatment) : undefined;
  }

  async updateStorage(id: string, quantity: number): Promise<void> {
    await Treatments.update(
      { treatmentQuantity: quantity },
      { where: { treatmentId: id } }
    );
  }

  async delete(id: string): Promise<void> {
    await Treatments.destroy({ where: { treatmentId: id } });
  }

  async list(): Promise<Treatment[]> {
    const allTreatmentInstances = await Treatments.findAll();
    const allTreatmentObjects: Treatment[] = [];

    for (let i = 0; i < allTreatmentInstances.length; i++) {
      allTreatmentObjects.push(
        await treatmentInstanceToObj(allTreatmentInstances[i])
      );
    }

    return allTreatmentObjects;
  }
}

export async function treatmentInstanceToObj(
  instance: any
): Promise<Treatment> {
  return new Treatment(
    instance.dataValues.treatmentName,
    instance.dataValues.treatmentQuantity,
    instance.dataValues.treatmentCost,
    instance.dataValues.treatmentExpirationDate,
    partnerInstanceToObj(
      await BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.treatmentSellerId },
      })
    ),
    instance.dataValues.treatmentId
  );
}
