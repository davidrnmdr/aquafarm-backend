import { BusinessPartner } from "../entities/businessPartner";
import { Food } from "../entities/food";
import { Treatment } from "../entities/treatment";
import { BusinessPartnerRepo } from "../ports/businessPartner-repo";
import crypto from "crypto";

export class FakeBusinessPartnerRepo implements BusinessPartnerRepo {
  businessPartners: BusinessPartner[] = [];

  async find(id: string): Promise<BusinessPartner | undefined> {
    return this.businessPartners.find((partner) => partner.id === id);
  }

  async add(businessPartner: BusinessPartner): Promise<string> {
    const newId = crypto.randomUUID();
    businessPartner.id = newId;
    this.businessPartners.push(businessPartner);
    return newId;
  }

  async updateProducts(
    id: string,
    product: Food | Treatment,
    type: "foods" | "treatments"
  ): Promise<void> {
    const partnerIndex = this.businessPartners.findIndex(
      (partner) => partner.id === id
    );

    this.businessPartners[partnerIndex][type].push(product as Food & Treatment);
  }

  async updateEmail(id: string, email: string): Promise<void> {
    const partnerIndex = this.businessPartners.findIndex(
      (partner) => partner.id === id
    );

    if (partnerIndex != -1) this.businessPartners[partnerIndex].email = email;
  }

  async deleteProduct(
    id: string,
    type: "food" | "treatment",
    productId: string
  ): Promise<void> {
    const partnerIndex = this.businessPartners.findIndex(
      (partner) => partner.id === id
    );

    if (partnerIndex != -1) {
      const productIndex = this.businessPartners[partnerIndex][
        `${type}s`
      ].findIndex((product) => product.id == productId);

      this.businessPartners[partnerIndex][`${type}s`].splice(productIndex, 1);
    }
  }

  async delete(id: string): Promise<void> {
    const partnerIndex = this.businessPartners.findIndex(
      (partner) => (partner.id = id)
    );

    if (partnerIndex != -1) this.businessPartners.splice(partnerIndex, 1);
  }

  async list(): Promise<BusinessPartner[]> {
    return this.businessPartners;
  }
}
