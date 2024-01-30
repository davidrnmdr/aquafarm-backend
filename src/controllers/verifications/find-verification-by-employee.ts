import { Request, Response } from "express";
import { TreatmentNotFoundError } from "../../errors/treatment-not-found-error";
import app from "../../app-factory";
import { UnableToFindError } from "../../errors/unable-to-find-error";

export async function findVerificationsByEmployeeController(
  req: Request,
  res: Response
) {
  try {
    const retrievedVerifications = await app.findVerificationsByEmployee(
      req.body.attribute,
      req.body.value
    );
    res.status(200).json({ retrievedVerifications });
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
