import { Request, Response } from "express";
import { EquipmentNotFoundError } from "../../errors/equipment-not-found-error";
import app from "../../app-factory";

export async function findEquipmentByIdController(req: Request, res: Response) {
  try {
    const retrievedEquipment = await app.findEquipment(req.body.id);
    res.status(200).json({ retrievedEquipment });
  } catch (e) {
    if (e instanceof EquipmentNotFoundError) {
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
