import express from "express";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";

import { registerEmployeeController } from "./controllers/employees/register-employee";
import { findEmployeeByEmailController } from "./controllers/employees/find-employee";
import { registerSpecieController } from "./controllers/fish-species/register-specie";
import { registerTankController } from "./controllers/tanks/register-tank";
import { findTankByController } from "./controllers/tanks/find-tank";
import { registerPartnerController } from "./controllers/business-partners/register-partner";
import { findPartnerByEinController } from "./controllers/business-partners/find-partner";
import { registerEquipmentController } from "./controllers/equipments/register-equipment";
import { findEquipmentByIdController } from "./controllers/equipments/find-equipment";
import { registerFoodController } from "./controllers/foods/register-food";
import { findFoodByIdController } from "./controllers/foods/find-food";
import { removeFoodController } from "./controllers/foods/remove-food";
import { registerTreatmentController } from "./controllers/treatments/register-treatment";
import { findTreatmentByIdController } from "./controllers/treatments/find-treatment";
import { removeTreatmentController } from "./controllers/treatments/remove-treatment";
import { registerVerificationController } from "./controllers/verifications/register-verification";
import { findVerificationsByEmployeeController } from "./controllers/verifications/find-verifications-by-employee";
import { registerFeedingController } from "./controllers/feedings/register-feeding";
import { findFeedingsByEmployeeController } from "./controllers/feedings/find-feedings-by-employee";
import { registerSaleController } from "./controllers/sales/register-sale";
import { findSalesByEmployeeController } from "./controllers/sales/find-sales-by-employee";
import { registerPurchaseController } from "./controllers/purchases/register-purchase";
import { findPurchasesByEmployeeController } from "./controllers/purchases/find-purchases-by-employee";
import { registerMedicationController } from "./controllers/medications/register-medication";
import { findMedicationsByEmployeeController } from "./controllers/medications/find-medications-by-employee";
import { registerMaintenanceController } from "./controllers/maintenances/register-maintenance";
import { findMaintenancesByEmployeeController } from "./controllers/maintenances/find-maintenances-by-employee";
import { filterSalesController } from "./controllers/sales/filter-sales";
import { filterPurchasesController } from "./controllers/purchases/filter-purchases";

const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set("access-control-allow-origin", "*");
  res.set("access-control-allow-headers", "*");
  res.set("access-control-allow-methods", "*");
  next();
};

const contentType = (req: Request, res: Response, next: NextFunction): void => {
  res.type("json");
  next();
};

const server = express();
server.use(bodyParser.json());
server.use(cors);
server.use(contentType);

// employees
server.post("/api/employees", registerEmployeeController);
server.get("/api/employees", findEmployeeByEmailController);

// fish-species
server.post("/api/fish-species", registerSpecieController);

// tanks
server.post("/api/tanks", registerTankController);
server.get("/api/tanks", findTankByController);

// business-partners
server.post("/api/business-partners", registerPartnerController);
server.get("/api/business-partners", findPartnerByEinController);

// equipments
server.post("/api/equipments", registerEquipmentController);
server.get("/api/equipments", findEquipmentByIdController);

// foods
server.post("/api/foods", registerFoodController);
server.get("/api/foods", findFoodByIdController);
server.delete("/api/foods", removeFoodController);

// treatments
server.post("/api/treatments", registerTreatmentController);
server.get("/api/treatments", findTreatmentByIdController);
server.delete("/api/treatments", removeTreatmentController);

// verifications
server.post("/api/verifications", registerVerificationController);
server.get("/api/verifications", findVerificationsByEmployeeController);

// feedings
server.post("/api/feedings", registerFeedingController);
server.get("/api/feedings", findFeedingsByEmployeeController);

// transactions
server.post("/api/sales", registerSaleController);
server.get("/api/sales", findSalesByEmployeeController);
server.get("/api/sales/filter", filterSalesController);
server.post("/api/purchases", registerPurchaseController);
server.get("/api/purchases", findPurchasesByEmployeeController);
server.get("/api/purchases/filter", filterPurchasesController);

// medications
server.post("/api/medications", registerMedicationController);
server.get("/api/medications", findMedicationsByEmployeeController);

// maintenances
server.post("/api/maintenances", registerMaintenanceController);
server.get("/api/maintenances", findMaintenancesByEmployeeController);

const port = 3000;
const serverApp = server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default serverApp;
