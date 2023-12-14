import { BusinessPartner } from "../entities/businessPartner";
import { Food } from "../entities/food";
import { Treatment } from "../entities/treatment";

export interface BusinessPartnerRepo {
  find(id: string): Promise<BusinessPartner | undefined>;
  add(businessPartner: BusinessPartner): Promise<string>;
  updateProducts(
    id: string,
    product: Food | Treatment,
    type: "foods" | "treatments"
  ): Promise<void>;
  updateEmail(id: string, email: string): Promise<void>;
  deleteProduct(
    id: string,
    type: "food" | "treatment",
    productId: string
  ): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<BusinessPartner[]>;
}
