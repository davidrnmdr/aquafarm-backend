import { Request, Response } from "express";
import { InvalidInputError } from "../../errors/invalid-input-error";
import app from "../../app-factory";
import { EmployeeNotFoundError } from "../../errors/employee-not-found-error";
import { EquipmentNotFoundError } from "../../errors/equipment-not-found-error";

export async function registerMaintenanceController(
  req: Request,
  res: Response
) {
  try {
    const id = await app.registerMaintenance(
      req.body.equipmentId,
      req.body.employeeEmail,
      req.body.cost
    );
    res.status(201).json({ id });
  } catch (e) {
    if (isKnownError(e)) {
      res.status(400).json({
        message: e.message,
      });
      return;
    }
    res.status(500).json({
      message: `Could not register maintenance.`,
    });
  }
}

function isKnownError(
  e: any
): e is InvalidInputError | EmployeeNotFoundError | EquipmentNotFoundError {
  return (
    e instanceof InvalidInputError ||
    e instanceof EmployeeNotFoundError ||
    e instanceof EquipmentNotFoundError
  );
}
