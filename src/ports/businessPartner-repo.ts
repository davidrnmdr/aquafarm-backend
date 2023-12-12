import { BusinessPartner } from "../businessPartner";
import { Food } from "../food";
import { Treatment } from "../treatment";
import { Produtcs } from "../types/Products";

export interface BusinessPartnerRepo {
  find(id: string): Promise<BusinessPartner>;
  add(businessPartner: BusinessPartner): Promise<string>;
  addProducts(foods: Food[], treatments: Treatment[]): Promise<Produtcs>;
  updateEmail(id: string, email: string): Promise<void>;
  deleteProduct(id: string, type: Food | Treatment): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<BusinessPartner[]>;
}
