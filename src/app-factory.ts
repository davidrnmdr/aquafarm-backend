import { App } from "./app";

import { SequelizeBusinessPartnerRepo } from "./services/database/sequelize-businessPartner-repo";
import { SequelizeEmployeeRepo } from "./services/database/sequelize-employee-repo";
import { SequelizeEquipmentRepo } from "./services/database/sequelize-equipment-repo";
import { SequelizeFeedingRepo } from "./services/database/sequelize-feeding-repo";
import { SequelizeFishSpecieRepo } from "./services/database/sequelize-fishSpecie-repo";
import { SequelizeFoodRepo } from "./services/database/sequelize-food-repo";
import { SequelizeMaintenanceRepo } from "./services/database/sequelize-maintenance-repo";
import { SequelizeMedicationRepo } from "./services/database/sequelize-medication-repo";
import { SequelizeTankRepo } from "./services/database/sequelize-tank-repo";
import { SequelizeTankVerificationRepo } from "./services/database/sequelize-tankVerification-repo";
import { SequelizeTransactionRepo } from "./services/database/sequelize-transaction-repo";
import { SequelizeTreatmentRepo } from "./services/database/sequelize-treatment-repo";
import { SequelizeWarningRepo } from "./services/database/sequelize-warning-repo";

if (!(global as any).app) {
  (global as any).app = new App(
    new SequelizeBusinessPartnerRepo(),
    new SequelizeEmployeeRepo(),
    new SequelizeEquipmentRepo(),
    new SequelizeFeedingRepo(),
    new SequelizeFoodRepo(),
    new SequelizeMaintenanceRepo(),
    new SequelizeTankRepo(),
    new SequelizeTankVerificationRepo(),
    new SequelizeTransactionRepo(),
    new SequelizeTreatmentRepo(),
    new SequelizeMedicationRepo(),
    new SequelizeWarningRepo(),
    new SequelizeFishSpecieRepo()
  );
}

export default (global as any).app;
