import express from "express";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { registerEmployeeController } from "./controllers/employees/register-employee";
import { findEmployeeController } from "./controllers/employees/find-employee";

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

// routes:
server.post("/api/employees", registerEmployeeController);
server.get("/api/employees", findEmployeeController);

const port = 3000;
const serverApp = server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default serverApp;
