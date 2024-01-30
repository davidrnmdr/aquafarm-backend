import { Request, Response } from "express";
import { InvalidInputError } from "../../errors/invalid-input-error";
import app from "../../app-factory";

export async function registerFoodController(req: Request, res: Response) {
  try {
    const id = await app.registerFood(req.body);
    res.status(201).json({ id });
  } catch (e) {
    if (e instanceof InvalidInputError) {
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
