import { BusinessPartner } from "../entities/businessPartner";
import { Food } from "../entities/food";
import { Treatment } from "../entities/treatment";

export interface BusinessPartnerRepo {
  find(ein: number): Promise<BusinessPartner | undefined>;
  add(businessPartner: BusinessPartner): Promise<string>;
  updateEmail(id: string, email: string): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<BusinessPartner[]>;
}
