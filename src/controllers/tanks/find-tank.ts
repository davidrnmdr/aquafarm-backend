import { Request, Response } from "express";
import { TankNotFoundError } from "../../errors/tank-not-found-error";
import app from "../../app-factory";
import { Tank } from "../../entities/tank";

export async function findTankByController(req: Request, res: Response) {
  try {
    let retrieved: Tank | Tank[];
    if (req.body.by == "id") {
      retrieved = await app.findTank(req.body.value);
    } else {
      retrieved = await app.findTanksBy(req.body.by, req.body.value);
    }

    res.status(200).json({ retrieved });
  } catch (e) {
    if (e instanceof TankNotFoundError) {
      res.status(400).json({
        message: e.message,
      });
      return;
    }

    res.status(500).json({
      message: `Could not find tank.`,
    });
  }
}
