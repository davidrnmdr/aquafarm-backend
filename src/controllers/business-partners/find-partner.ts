import { Request, Response } from "express";
import { PartnerNotFoundError } from "../../errors/partner-not-found-error";
import app from "../../app-factory";

export async function findPartnerByEinController(req: Request, res: Response) {
  try {
    const retrievedPartner = await app.findBusinessPartner(req.body.ein);
    res.status(200).json({ retrievedPartner });
  } catch (e) {
    if (e instanceof PartnerNotFoundError) {
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
