import { Request, Response } from "express";
import app from "../../app-factory";
import { UnableToFindError } from "../../errors/unable-to-find-error";

export async function findPurchasesByEmployeeController(
  req: Request,
  res: Response
) {
  try {
    const retrievedPurchases = await app.findPurchasesByEmployee(
      req.body.attribute,
      req.body.value
    );
    res.status(200).json({ retrievedPurchases });
  } catch (e) {
    if (e instanceof UnableToFindError) {
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
