import { Request, Response } from "express";
import { InvalidInputError } from "../../errors/invalid-input-error";
import app from "../../app-factory";
import { TankNotFoundError } from "../../errors/tank-not-found-error";
import { EmployeeNotFoundError } from "../../errors/employee-not-found-error";

export async function registerVerificationController(
  req: Request,
  res: Response
) {
  try {
    const id = await app.registerVerification(
      req.body.tankId,
      req.body.employeeEmail,
      req.body.temperature,
      req.body.oxygen,
      req.body.ph
    );
    res.status(201).json({ id });
  } catch (e) {
    if (
      e instanceof InvalidInputError ||
      e instanceof TankNotFoundError ||
      e instanceof EmployeeNotFoundError
    ) {
      res.status(400).json({
        message: e.message,
      });
      return;
    }
    res.status(500).json({
      message: `Could not register food.`,
    });
  }
}
