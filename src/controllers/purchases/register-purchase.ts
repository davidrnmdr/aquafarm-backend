import { Request, Response } from "express";
import { InvalidInputError } from "../../errors/invalid-input-error";
import app from "../../app-factory";
import { EmployeeNotFoundError } from "../../errors/employee-not-found-error";
import { PartnerNotFoundError } from "../../errors/partner-not-found-error";
import { FoodNotFoundError } from "../../errors/food-not-found-error";
import { TreatmentNotFoundError } from "../../errors/treatment-not-found-error";
import { EquipmentNotFoundError } from "../../errors/equipment-not-found-error";

export async function registerPurchaseController(req: Request, res: Response) {
  try {
    const id = await app.registerPurchase(
      req.body.value,
      req.body.partnerEin,
      req.body.foodId,
      req.body.treatmentId,
      req.body.equipmentId,
      req.body.employeeEmail
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
      message: `Could not register purchase.`,
    });
  }
}

function isKnownError(
  e: any
): e is
  | InvalidInputError
  | EmployeeNotFoundError
  | PartnerNotFoundError
  | FoodNotFoundError
  | TreatmentNotFoundError
  | EquipmentNotFoundError {
  return (
    e instanceof InvalidInputError ||
    e instanceof EmployeeNotFoundError ||
    e instanceof PartnerNotFoundError ||
    e instanceof FoodNotFoundError ||
    e instanceof TreatmentNotFoundError ||
    e instanceof EquipmentNotFoundError
  );
}
