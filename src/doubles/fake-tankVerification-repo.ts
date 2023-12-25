import { TankVerification } from "../entities/tankVerification";
import { TankVerificationRepo } from "../ports/tankVerification-repo";
import crypto from "crypto";

export class FakeTankVerificationRepo implements TankVerificationRepo {
  verifications: TankVerification[] = [];

  async add(tankVerification: TankVerification): Promise<string> {
    const newId = crypto.randomUUID();

    tankVerification.id = newId;
    this.verifications.push(tankVerification);

    return newId;
  }

  async find(id: string): Promise<TankVerification | undefined> {
    return this.verifications.find((verification) => verification.id === id);
  }

  async findByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<TankVerification[]> {
    return this.verifications.filter(
      (verification) => verification.employee[attribute] === value
    );
  }

  async delete(id: string): Promise<void> {
    const verificationIndex = this.verifications.findIndex(
      (verification) => verification.id === id
    );

    if (verificationIndex != -1)
      this.verifications.splice(verificationIndex, 1);
  }

  async list(): Promise<TankVerification[]> {
    return this.verifications;
  }
}
