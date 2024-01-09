import { BusinessPartnerRepo } from "../../ports/businessPartner-repo";

import crypto from "crypto";

import { BusinessPartners } from "./models";
import { BusinessPartner } from "../../entities/businessPartner";

export class SequelizeBusinessPartnerRepo implements BusinessPartnerRepo {
  async add(businessPartner: BusinessPartner): Promise<string> {
    const newId = crypto.randomUUID();

    await BusinessPartners.create({
      partnerEin: businessPartner.ein,
      partnerEmail: businessPartner.email,
      partnerName: businessPartner.name,
      partnerAddress: businessPartner.address,
      partnerId: newId,
    });

    return newId;
  }

  async find(ein: number): Promise<BusinessPartner | undefined> {
    const partner = await BusinessPartners.findOne({
      where: { partnerEin: `${ein}` },
    });

    return partner ? partnerInstanceToObj(partner) : undefined;
  }

  async updateEmail(id: string, email: string): Promise<void> {
    await BusinessPartners.update(
      { partnerEmail: email },
      { where: { partnerId: id } }
    );
  }

  async delete(id: string): Promise<void> {
    await BusinessPartners.destroy({ where: { partnerId: id } });
  }

  async list(): Promise<BusinessPartner[]> {
    return (await BusinessPartners.findAll()).map(partnerInstanceToObj);
  }
}

function partnerInstanceToObj(instance: any): BusinessPartner {
  return new BusinessPartner(
    Number(instance.dataValues.partnerEin),
    instance.dataValues.partnerEmail,
    instance.dataValues.partnerName,
    instance.dataValues.partnerAddress,
    instance.dataValues.partnerId
  );
}
