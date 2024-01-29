import { Request, Response } from "express";
import app from "../../app-factory";

export async function registerSpecieController(req: Request, res: Response) {
  try {
    const id = await app.registerSpecie(req.body);
    res.status(201).json({ id });
  } catch (e) {
    res.status(500).json({
      message: "Could not register fish specie.",
    });
    return;
  }
}
