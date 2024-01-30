import { Request, Response } from "express";
import { InvalidInputError } from "../../errors/invalid-input-error";
import app from "../../app-factory";
import { TankNotFoundError } from "../../errors/tank-not-found-error";
import { EmployeeNotFoundError } from "../../errors/employee-not-found-error";
import { FoodNotFoundError } from "../../errors/food-not-found-error";
import { InsuficientFoodError } from "../../errors/insuficient-food-error";
import { ExpiredFoodError } from "../../errors/expired-food-error";

export async function registerFeedingController(req: Request, res: Response) {
  try {
    const id = await app.registerFeeding(
      req.body.tankId,
      req.body.employeeEmail,
      req.body.foodId,
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
      message: `Could not register feeding.`,
    });
  }
}

function isKnownError(
  e: any
): e is
  | InvalidInputError
  | TankNotFoundError
  | EmployeeNotFoundError
  | FoodNotFoundError
  | InsuficientFoodError
  | ExpiredFoodError {
  return (
    e instanceof InvalidInputError ||
    e instanceof TankNotFoundError ||
    e instanceof EmployeeNotFoundError ||
    e instanceof FoodNotFoundError ||
    e instanceof InsuficientFoodError ||
    e instanceof ExpiredFoodError
  );
}
