import { Request, Response } from "express";
import { DuplicatedEmployeeError } from "../../errors/duplicate-employee-error";
import app from "../../app-factory";

export async function registerEmployeeController(req: Request, res: Response) {
  try {
    const id = await app.registerEmployee(req.body);
    res.status(201).json({ id });
  } catch (e) {
    if (e instanceof DuplicatedEmployeeError) {
      res.status(400).json({
        message: "Could not register employee.",
      });
      return;
    }
    res.status(500).json({
      message: `Could not register employee.`,
    });
  }
}
