"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var sequelize_businessPartner_repo_1 = require("./services/database/sequelize-businessPartner-repo");
var sequelize_employee_repo_1 = require("./services/database/sequelize-employee-repo");
var sequelize_equipment_repo_1 = require("./services/database/sequelize-equipment-repo");
var sequelize_feeding_repo_1 = require("./services/database/sequelize-feeding-repo");
var sequelize_fishSpecie_repo_1 = require("./services/database/sequelize-fishSpecie-repo");
var sequelize_food_repo_1 = require("./services/database/sequelize-food-repo");
var sequelize_maintenance_repo_1 = require("./services/database/sequelize-maintenance-repo");
var sequelize_medication_repo_1 = require("./services/database/sequelize-medication-repo");
var sequelize_tank_repo_1 = require("./services/database/sequelize-tank-repo");
var sequelize_tankVerification_repo_1 = require("./services/database/sequelize-tankVerification-repo");
var sequelize_transaction_repo_1 = require("./services/database/sequelize-transaction-repo");
var sequelize_treatment_repo_1 = require("./services/database/sequelize-treatment-repo");
var sequelize_warning_repo_1 = require("./services/database/sequelize-warning-repo");
if (!global.app) {
    global.app = new app_1.App(new sequelize_businessPartner_repo_1.SequelizeBusinessPartnerRepo(), new sequelize_employee_repo_1.SequelizeEmployeeRepo(), new sequelize_equipment_repo_1.SequelizeEquipmentRepo(), new sequelize_feeding_repo_1.SequelizeFeedingRepo(), new sequelize_food_repo_1.SequelizeFoodRepo(), new sequelize_maintenance_repo_1.SequelizeMaintenanceRepo(), new sequelize_tank_repo_1.SequelizeTankRepo(), new sequelize_tankVerification_repo_1.SequelizeTankVerificationRepo(), new sequelize_transaction_repo_1.SequelizeTransactionRepo(), new sequelize_treatment_repo_1.SequelizeTreatmentRepo(), new sequelize_medication_repo_1.SequelizeMedicationRepo(), new sequelize_warning_repo_1.SequelizeWarningRepo(), new sequelize_fishSpecie_repo_1.SequelizeFishSpecieRepo());
}
exports.default = global.app;
