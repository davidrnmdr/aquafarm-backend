import { Warning } from "../entities/warning";

export interface WarningRepo {
  add(warning: Warning): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<Warning[]>;
}
