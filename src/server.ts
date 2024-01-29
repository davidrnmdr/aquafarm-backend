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

const port = 3000;
const serverApp = server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default serverApp;
