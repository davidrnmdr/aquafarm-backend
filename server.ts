import express from "express";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";

import { registerEmployeeController } from "./src/controllers/employees/register-employee";
import { findEmployeeByEmailController } from "./src/controllers/employees/find-employee";
import { registerSpecieController } from "./src/controllers/fish-species/register-specie";
import { registerTankController } from "./src/controllers/tanks/register-tank";
import { findTankByController } from "./src/controllers/tanks/find-tank";
import { registerPartnerController } from "./src/controllers/business-partners/register-partner";
import { findPartnerByEinController } from "./src/controllers/business-partners/find-partner";
import { registerEquipmentController } from "./src/controllers/equipments/register-equipment";
import { findEquipmentByIdController } from "./src/controllers/equipments/find-equipment";
import { registerFoodController } from "./src/controllers/foods/register-food";
import { findFoodByIdController } from "./src/controllers/foods/find-food";
import { removeFoodController } from "./src/controllers/foods/remove-food";
import { registerTreatmentController } from "./src/controllers/treatments/register-treatment";
import { findTreatmentByIdController } from "./src/controllers/treatments/find-treatment";
import { removeTreatmentController } from "./src/controllers/treatments/remove-treatment";
import { registerVerificationController } from "./src/controllers/verifications/register-verification";
import { findVerificationsByEmployeeController } from "./src/controllers/verifications/find-verifications-by-employee";
import { registerFeedingController } from "./src/controllers/feedings/register-feeding";
import { findFeedingsByEmployeeController } from "./src/controllers/feedings/find-feedings-by-employee";
import { registerSaleController } from "./src/controllers/sales/register-sale";
import { findSalesByEmployeeController } from "./src/controllers/sales/find-sales-by-employee";
import { registerPurchaseController } from "./src/controllers/purchases/register-purchase";
import { findPurchasesByEmployeeController } from "./src/controllers/purchases/find-purchases-by-employee";
import { registerMedicationController } from "./src/controllers/medications/register-medication";
import { findMedicationsByEmployeeController } from "./src/controllers/medications/find-medications-by-employee";
import { registerMaintenanceController } from "./src/controllers/maintenances/register-maintenance";
import { findMaintenancesByEmployeeController } from "./src/controllers/maintenances/find-maintenances-by-employee";
import { filterSalesController } from "./src/controllers/sales/filter-sales";
import { filterPurchasesController } from "./src/controllers/purchases/filter-purchases";

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
