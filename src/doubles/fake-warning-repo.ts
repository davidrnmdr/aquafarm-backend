import { Warning } from "../entities/warning";
import { WarningRepo } from "../ports/warning-repo";
import crypto from "crypto";

export class FakeWarningRepo implements WarningRepo {
  warnings: Warning[] = [];

  async add(warning: Warning): Promise<string> {
    const newId = crypto.randomUUID();

    warning.id = newId;
    this.warnings.push(warning);

    return newId;
  }

  async delete(id: string): Promise<void> {
    const warningIndex = this.warnings.findIndex(
      (warning) => warning.id === id
    );

    if (warningIndex != -1) this.warnings.splice(warningIndex, 1);
  }

  async list(): Promise<Warning[]> {
    return this.warnings;
  }
}
