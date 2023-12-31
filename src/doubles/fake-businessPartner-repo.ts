import { BusinessPartner } from "../entities/businessPartner";
import { Food } from "../entities/food";
import { Treatment } from "../entities/treatment";
import { BusinessPartnerRepo } from "../ports/businessPartner-repo";
import crypto from "crypto";

export class FakeBusinessPartnerRepo implements BusinessPartnerRepo {
  businessPartners: BusinessPartner[] = [];

  async find(ein: number): Promise<BusinessPartner | undefined> {
    return this.businessPartners.find((partner) => partner.ein === ein);
  }

  async add(businessPartner: BusinessPartner): Promise<string> {
    const newId = crypto.randomUUID();
    businessPartner.id = newId;
    this.businessPartners.push(businessPartner);
    return newId;
  }

  async updateEmail(id: string, email: string): Promise<void> {
    const partnerIndex = this.businessPartners.findIndex(
      (partner) => partner.id === id
    );

    if (partnerIndex != -1) this.businessPartners[partnerIndex].email = email;
  }

  async delete(id: string): Promise<void> {
    const partnerIndex = this.businessPartners.findIndex(
      (partner) => partner.id === id
    );

    if (partnerIndex != -1) this.businessPartners.splice(partnerIndex, 1);
  }

  async list(): Promise<BusinessPartner[]> {
    return this.businessPartners;
  }
}
