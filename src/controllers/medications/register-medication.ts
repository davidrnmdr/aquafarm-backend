import { Request, Response } from "express";
import { InvalidInputError } from "../../errors/invalid-input-error";
import app from "../../app-factory";
import { TankNotFoundError } from "../../errors/tank-not-found-error";
import { EmployeeNotFoundError } from "../../errors/employee-not-found-error";
import { TreatmentNotFoundError } from "../../errors/treatment-not-found-error";
import { InsuficientTreatmentError } from "../../errors/insuficient-treatment-error";
import { ExpiredTreatmentError } from "../../errors/expired-treatment-error";

export async function registerMedicationController(
  req: Request,
  res: Response
) {
  try {
    const id = await app.registerMedication(
      req.body.tankId,
      req.body.employeeEmail,
      req.body.treatmentId,
      req.body.quantity
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
      message: `Could not register medication.`,
    });
  }
}

function isKnownError(
  e: any
): e is
  | InvalidInputError
  | TankNotFoundError
  | EmployeeNotFoundError
  | TreatmentNotFoundError
  | InsuficientTreatmentError
  | ExpiredTreatmentError {
  return (
    e instanceof InvalidInputError ||
    e instanceof TankNotFoundError ||
    e instanceof EmployeeNotFoundError ||
    e instanceof TreatmentNotFoundError ||
    e instanceof InsuficientTreatmentError ||
    e instanceof ExpiredTreatmentError
  );
}
