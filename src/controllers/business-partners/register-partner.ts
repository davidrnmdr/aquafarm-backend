import { Request, Response } from "express";
import { DuplicatePartnerError } from "../../errors/duplicate-partner-error";
import app from "../../app-factory";

export async function registerPartnerController(req: Request, res: Response) {
  try {
    const id = await app.registerBusinessPartner(req.body);
    res.status(201).json({ id });
  } catch (e) {
    if (e instanceof DuplicatePartnerError) {
      res.status(400).json({
        message: e.message,
      });
      return;
    }
    res.status(500).json({
      message: `Internal server error.`,
    });
  }
}
