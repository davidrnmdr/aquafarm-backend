import { TankVerification } from "../entities/tankVerification";

export interface TankVerificationRepo {
  add(tankVerification: TankVerification): Promise<string>;
  find(id: string): Promise<TankVerification | undefined>;
  findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<TankVerification[]>;
  delete(id: string): Promise<void>;
  list(): Promise<TankVerification[]>;
}
