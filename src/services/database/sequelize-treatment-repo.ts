import { TreatmentRepo } from "../../ports/treatment-repo";

import crypto from "crypto";

import { Treatments } from "./models";
import { Treatment } from "../../entities/treatment";

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
    return (await Treatments.findAll()).map(treatmentInstanceToObj);
  }
}

function treatmentInstanceToObj(instance: any): Treatment {
  return new Treatment(
    instance.dataValues.treatmentName,
    instance.dataValues.treatmentQuantity,
    instance.dataValues.treatmentCost,
    instance.dataValues.treatmentExpirationDate,
    instance.dataValues.treatmentSellerId,
    instance.dataValues.treatmentId
  );
}
