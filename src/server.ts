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

const port = 3000;
const serverApp = server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default serverApp;
