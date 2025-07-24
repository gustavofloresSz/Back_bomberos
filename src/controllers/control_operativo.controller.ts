import { ControlOperativo } from "../entities/control_operativo";
import { Request, Response } from "express";

export class ControlOperativoController {

  async getControlOperativo(req: Request, res: Response) {
    try {
      const registros = await ControlOperativo.find();
      return res.json(registros);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener registros', error });
    }
  }

  async addControlOperativo(req: Request, res: Response) {
    try {
        const {
        fecha_fin,
        responsable,
        cuadrillas,
        efectivo,
        lugar,
        distancia_kms,
        material_equipo,
        novedades
        } = req.body;

        // Obtener fecha actual en formato YYYY-MM-DD
        const hoy = new Date();
        const fecha_inicio = hoy.toISOString().split("T")[0]; // ejemplo: "2025-07-23"

        const nuevo = ControlOperativo.create({
        fecha_inicio,
        fecha_fin,
        responsable,
        cuadrillas,
        efectivo,
        lugar,
        distancia_kms,
        material_equipo,
        novedades
        });

        await nuevo.save();
        return res.status(201).json(nuevo);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear registro', error });
    }
  }


  async deleteControlOperativo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await ControlOperativo.findOneBy({ id: Number(id) });

      if (!registro) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }

      await registro.remove();
      return res.status(200).json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar registro', error });
    }
  }

  async updateControlOperativo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await ControlOperativo.findOneBy({ id: Number(id) });

      if (!registro) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }

      Object.assign(registro, req.body);
      await registro.save();
      return res.json(registro);
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar registro', error });
    }
  }
}