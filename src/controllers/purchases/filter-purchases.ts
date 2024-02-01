import { Request, Response } from "express";
import { InvalidInputError } from "../../errors/invalid-input-error";
import app from "../../app-factory";

export async function filterPurchasesController(req: Request, res: Response) {
  try {
    const retrievedPurchases = await app.filterPurchases({
      value: req.body.valueMin
        ? { min: req.body.valueMin, max: req.body.valueMax }
        : undefined,
      partner: req.body.partnerEin ? { ein: req.body.partnerEin } : undefined,
      date: req.body.dateMin
        ? { min: new Date(req.body.dateMin), max: new Date(req.body.dateMax) }
        : undefined,
      food: req.body.food,
      treatment: req.body.treatment,
      equipment: req.body.equipment,
    });
    res.status(200).json({ retrievedPurchases });
  } catch (e) {
    if (isKnownError(e)) {
      res.status(400).json({
        message: e.message,
      });
      return;
    }
    res.status(500).json({
      message: `Could not filter purchases.`,
    });
  }
}

function isKnownError(e: any): e is InvalidInputError {
  return e instanceof InvalidInputError;
}
