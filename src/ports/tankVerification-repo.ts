import { TankVerification } from "../entities/tankVerification";

export interface TankVerificationRepo {
  add(tankVerification: TankVerification): Promise<string>;
  find(id: string): Promise<TankVerification | undefined>;
  delete(id: string): Promise<void>;
  list(): Promise<TankVerification[]>;
}
