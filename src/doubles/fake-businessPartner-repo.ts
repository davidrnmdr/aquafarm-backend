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
    foods: Food[],
    treatments: Treatment[]
  ): Promise<void> {
    const partnerIndex = this.businessPartners.findIndex(
      (partner) => partner.id === id
    );

    if (partnerIndex != -1) {
      foods.forEach((food) => {
        this.businessPartners[partnerIndex].products.foods.push({ food });
      });

      treatments.forEach((treatment) => {
        this.businessPartners[partnerIndex].products.treatments.push({
          treatment,
        });
      });
    }
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
      const productIndex =
        type === "food"
          ? this.businessPartners[partnerIndex].products.foods.findIndex(
              (foodProduct) => (foodProduct.food.id = productId)
            )
          : this.businessPartners[partnerIndex].products.treatments.findIndex(
              (treatmentProduct) => (treatmentProduct.treatment.id = productId)
            );

      if (productIndex != -1)
        this.businessPartners[partnerIndex].products[`${type}s`].splice(
          productIndex,
          1
        );
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
