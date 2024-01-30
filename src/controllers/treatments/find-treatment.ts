import { Request, Response } from "express";
import { TreatmentNotFoundError } from "../../errors/treatment-not-found-error";
import app from "../../app-factory";

export async function findTreatmentByIdController(req: Request, res: Response) {
  try {
    const retrievedTreatment = await app.findTreatment(req.body.id);
    res.status(200).json({ retrievedTreatment });
  } catch (e) {
    if (e instanceof TreatmentNotFoundError) {
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
