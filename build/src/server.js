"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const register_employee_1 = require("./controllers/employees/register-employee");
const find_employee_1 = require("./controllers/employees/find-employee");
const register_specie_1 = require("./controllers/fish-species/register-specie");
const register_tank_1 = require("./controllers/tanks/register-tank");
const find_tank_1 = require("./controllers/tanks/find-tank");
const register_partner_1 = require("./controllers/business-partners/register-partner");
const find_partner_1 = require("./controllers/business-partners/find-partner");
const register_equipment_1 = require("./controllers/equipments/register-equipment");
const find_equipment_1 = require("./controllers/equipments/find-equipment");
const register_food_1 = require("./controllers/foods/register-food");
const find_food_1 = require("./controllers/foods/find-food");
const remove_food_1 = require("./controllers/foods/remove-food");
const register_treatment_1 = require("./controllers/treatments/register-treatment");
const find_treatment_1 = require("./controllers/treatments/find-treatment");
const remove_treatment_1 = require("./controllers/treatments/remove-treatment");
const register_verification_1 = require("./controllers/verifications/register-verification");
const find_verifications_by_employee_1 = require("./controllers/verifications/find-verifications-by-employee");
const register_feeding_1 = require("./controllers/feedings/register-feeding");
const find_feedings_by_employee_1 = require("./controllers/feedings/find-feedings-by-employee");
const register_sale_1 = require("./controllers/sales/register-sale");
const find_sales_by_employee_1 = require("./controllers/sales/find-sales-by-employee");
const register_purchase_1 = require("./controllers/purchases/register-purchase");
const find_purchases_by_employee_1 = require("./controllers/purchases/find-purchases-by-employee");
const register_medication_1 = require("./controllers/medications/register-medication");
const find_medications_by_employee_1 = require("./controllers/medications/find-medications-by-employee");
const register_maintenance_1 = require("./controllers/maintenances/register-maintenance");
const find_maintenances_by_employee_1 = require("./controllers/maintenances/find-maintenances-by-employee");
const filter_sales_1 = require("./controllers/sales/filter-sales");
const filter_purchases_1 = require("./controllers/purchases/filter-purchases");
const cors = (req, res, next) => {
    res.set("access-control-allow-origin", "*");
    res.set("access-control-allow-headers", "*");
    res.set("access-control-allow-methods", "*");
    next();
};
const contentType = (req, res, next) => {
    res.type("json");
    next();
};
const server = (0, express_1.default)();
server.use(body_parser_1.default.json());
server.use(cors);
server.use(contentType);
// employees
server.post("/api/employees", register_employee_1.registerEmployeeController);
server.get("/api/employees", find_employee_1.findEmployeeByEmailController);
// fish-species
server.post("/api/fish-species", register_specie_1.registerSpecieController);
// tanks
server.post("/api/tanks", register_tank_1.registerTankController);
server.get("/api/tanks", find_tank_1.findTankByController);
// business-partners
server.post("/api/business-partners", register_partner_1.registerPartnerController);
server.get("/api/business-partners", find_partner_1.findPartnerByEinController);
// equipments
server.post("/api/equipments", register_equipment_1.registerEquipmentController);
server.get("/api/equipments", find_equipment_1.findEquipmentByIdController);
// foods
server.post("/api/foods", register_food_1.registerFoodController);
server.get("/api/foods", find_food_1.findFoodByIdController);
server.delete("/api/foods", remove_food_1.removeFoodController);
// treatments
server.post("/api/treatments", register_treatment_1.registerTreatmentController);
server.get("/api/treatments", find_treatment_1.findTreatmentByIdController);
server.delete("/api/treatments", remove_treatment_1.removeTreatmentController);
// verifications
server.post("/api/verifications", register_verification_1.registerVerificationController);
server.get("/api/verifications", find_verifications_by_employee_1.findVerificationsByEmployeeController);
// feedings
server.post("/api/feedings", register_feeding_1.registerFeedingController);
server.get("/api/feedings", find_feedings_by_employee_1.findFeedingsByEmployeeController);
// transactions
server.post("/api/sales", register_sale_1.registerSaleController);
server.get("/api/sales", find_sales_by_employee_1.findSalesByEmployeeController);
server.get("/api/sales/filter", filter_sales_1.filterSalesController);
server.post("/api/purchases", register_purchase_1.registerPurchaseController);
server.get("/api/purchases", find_purchases_by_employee_1.findPurchasesByEmployeeController);
server.get("/api/purchases/filter", filter_purchases_1.filterPurchasesController);
// medications
server.post("/api/medications", register_medication_1.registerMedicationController);
server.get("/api/medications", find_medications_by_employee_1.findMedicationsByEmployeeController);
// maintenances
server.post("/api/maintenances", register_maintenance_1.registerMaintenanceController);
server.get("/api/maintenances", find_maintenances_by_employee_1.findMaintenancesByEmployeeController);
const port = 3000;
const serverApp = server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
exports.default = serverApp;
