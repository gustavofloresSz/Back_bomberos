import { Request, Response } from "express";
import { Hectarea } from "../entities/hectarea";

export class HectareaController {

  async getHectarea(req: Request, res: Response) {
    const hectarea = await Hectarea.find();
    res.json(hectarea);
  }

  async addHectarea(req:Request, res:Response){
    const {comunidad, municipio, hectarea_afectada}= req.body;
    const hectarea = Hectarea.create({comunidad,municipio,hectarea_afectada});
    await hectarea.save();
    res.status(201).json(hectarea);
  }

  async updateHectarea(req: Request, res: Response) {
    const { id } = req.params;
    const { comunidad, municipio, hectarea_afectada } = req.body;

    const hectarea = await Hectarea.findOneBy({ id: parseInt(id) });
    if (!hectarea) return res.status(404).json({ message: "Registro no encontrado" });

    hectarea.comunidad = comunidad ?? hectarea.comunidad;
    hectarea.municipio = municipio ?? hectarea.municipio;
    hectarea.hectarea_afectada = hectarea_afectada ?? hectarea.hectarea_afectada;

    await hectarea.save();
    res.json(hectarea);
  }

  async deleteHectarea(req: Request, res: Response) {
    const { id } = req.params;

    const hectarea = await Hectarea.findOneBy({ id: parseInt(id) });
    if (!hectarea) return res.status(404).json({ message: "Registro no encontrado" });

    await hectarea.remove();
    res.json({ message: "Registro eliminado correctamente" });
  }
}