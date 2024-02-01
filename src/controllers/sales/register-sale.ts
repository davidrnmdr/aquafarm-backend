import { Request, Response } from "express";
import { InvalidInputError } from "../../errors/invalid-input-error";
import app from "../../app-factory";
import { EmployeeNotFoundError } from "../../errors/employee-not-found-error";
import { PartnerNotFoundError } from "../../errors/partner-not-found-error";

export async function registerSaleController(req: Request, res: Response) {
  try {
    const id = await app.registerSale(
      req.body.value,
      req.body.partnerEin,
      req.body.quantity,
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
      message: `Could not register sale.`,
    });
  }
}

function isKnownError(
  e: any
): e is InvalidInputError | EmployeeNotFoundError | PartnerNotFoundError {
  return (
    e instanceof InvalidInputError ||
    e instanceof EmployeeNotFoundError ||
    e instanceof PartnerNotFoundError
  );
}
