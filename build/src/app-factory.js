"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const sequelize_businessPartner_repo_1 = require("./services/database/sequelize-businessPartner-repo");
const sequelize_employee_repo_1 = require("./services/database/sequelize-employee-repo");
const sequelize_equipment_repo_1 = require("./services/database/sequelize-equipment-repo");
const sequelize_feeding_repo_1 = require("./services/database/sequelize-feeding-repo");
const sequelize_fishSpecie_repo_1 = require("./services/database/sequelize-fishSpecie-repo");
const sequelize_food_repo_1 = require("./services/database/sequelize-food-repo");
const sequelize_maintenance_repo_1 = require("./services/database/sequelize-maintenance-repo");
const sequelize_medication_repo_1 = require("./services/database/sequelize-medication-repo");
const sequelize_tank_repo_1 = require("./services/database/sequelize-tank-repo");
const sequelize_tankVerification_repo_1 = require("./services/database/sequelize-tankVerification-repo");
const sequelize_transaction_repo_1 = require("./services/database/sequelize-transaction-repo");
const sequelize_treatment_repo_1 = require("./services/database/sequelize-treatment-repo");
const sequelize_warning_repo_1 = require("./services/database/sequelize-warning-repo");
if (!global.app) {
    global.app = new app_1.App(new sequelize_businessPartner_repo_1.SequelizeBusinessPartnerRepo(), new sequelize_employee_repo_1.SequelizeEmployeeRepo(), new sequelize_equipment_repo_1.SequelizeEquipmentRepo(), new sequelize_feeding_repo_1.SequelizeFeedingRepo(), new sequelize_food_repo_1.SequelizeFoodRepo(), new sequelize_maintenance_repo_1.SequelizeMaintenanceRepo(), new sequelize_tank_repo_1.SequelizeTankRepo(), new sequelize_tankVerification_repo_1.SequelizeTankVerificationRepo(), new sequelize_transaction_repo_1.SequelizeTransactionRepo(), new sequelize_treatment_repo_1.SequelizeTreatmentRepo(), new sequelize_medication_repo_1.SequelizeMedicationRepo(), new sequelize_warning_repo_1.SequelizeWarningRepo(), new sequelize_fishSpecie_repo_1.SequelizeFishSpecieRepo());
}
exports.default = global.app;
