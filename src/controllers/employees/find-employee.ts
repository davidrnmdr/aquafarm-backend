import { Request, Response } from "express";
import { EmployeeNotFoundError } from "../../errors/employee-not-found-error";
import app from "../../app-factory";

export async function findEmployeeController(req: Request, res: Response) {
  try {
    const retrievedEmployee = await app.findEmployee(req.body.email);
    res.status(200).json({ retrievedEmployee });
  } catch (e) {
    if (e instanceof EmployeeNotFoundError) {
      res.status(404).json({
        message: "Could not find employee.",
      });
      return;
    }
    res.status(500).json({
      message: `Internal server error.`,
    });
  }
}
