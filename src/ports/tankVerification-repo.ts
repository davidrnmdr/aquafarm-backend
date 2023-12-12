import { TankVerification } from "../tankVerification";

export interface TankVerificationRepo {
  find(id: string): Promise<TankVerification>;
  add(tankVerification: TankVerification): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<TankVerification[]>;
}
