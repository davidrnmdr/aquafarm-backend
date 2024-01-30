import { Request, Response } from "express";
import { FoodNotFoundError } from "../../errors/food-not-found-error";
import app from "../../app-factory";

export async function findFoodByIdController(req: Request, res: Response) {
  try {
    const retrievedFood = await app.findFood(req.body.id);
    res.status(200).json({ retrievedFood });
  } catch (e) {
    if (e instanceof FoodNotFoundError) {
      res.status(404).json({
        message: e.message,
      });
      return;
    }
    res.status(500).json({
      message: `Internal server error.`,
    });
  }
}
