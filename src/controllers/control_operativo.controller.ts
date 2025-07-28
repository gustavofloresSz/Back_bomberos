import { ControlOperativo } from "../entities/control_operativo";
import { Request, Response } from "express";

export class ControlOperativoController {

  async getControlOperativo(req: Request, res: Response) {
    try {
      const tipo = req.query.tipo as string;
      const lugar = req.query.lugar as string;

      const whereClause: any = {};
      if (tipo) whereClause.tipo = tipo;
      if (lugar) whereClause.lugar = lugar;

      const registros = await ControlOperativo.find({ where: whereClause });

      return res.json(registros);
    } catch (error) {
      console.error("Error al obtener registros:", error);
      return res.status(500).json({ message: 'Error al obtener registros' });
    }
  }

  async addControlOperativo(req: Request, res: Response) {
    try {
      const {
        fecha_fin,
        responsable,
        efectivo_total,
        efectivo_uso,
        lugar,
        distancia_kms,
        material_equipo,
        novedades,
        tipo
      } = req.body;

      const nuevo = ControlOperativo.create({
        fecha_fin,
        responsable,
        efectivo_total,
        efectivo_uso,
        lugar,
        distancia_kms,
        material_equipo,
        novedades,
        tipo
      });

      await nuevo.save();
      return res.status(201).json(nuevo);
    } catch (error) {
      console.error("Error al crear registro:", error);
      return res.status(500).json({ message: 'Error al crear registro' });
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
      console.error("Error al eliminar registro:", error);
      return res.status(500).json({ message: 'Error al eliminar registro' });
    }
  }

  async updateControlOperativo(req: Request, res: Response) {
    const { id } = req.params;
    const {
      fecha_fin,
      responsable,
      cuadrillas,
      efectivo_total,
      efectivo_uso,
      lugar,
      distancia_kms,
      material_equipo,
      novedades,
      tipo
    } = req.body;

    try {
      const registro = await ControlOperativo.findOneBy({ id: Number(id) });

      if (!registro) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }

      registro.fecha_fin = fecha_fin ?? registro.fecha_fin;
      registro.responsable = responsable ?? registro.responsable;
      registro.efectivo_total = efectivo_total ?? registro.efectivo_total;
      registro.efectivo_uso = efectivo_uso ?? registro.efectivo_uso;
      registro.lugar = lugar ?? registro.lugar;
      registro.distancia_kms = distancia_kms ?? registro.distancia_kms;
      registro.material_equipo = material_equipo ?? registro.material_equipo;
      registro.novedades = novedades ?? registro.novedades;
      registro.tipo = tipo ?? registro.tipo;

      await registro.save();
      return res.json(registro);
    } catch (error) {
      console.error("Error al actualizar registro:", error);
      return res.status(500).json({ message: 'Error al actualizar registro' });
    }
  }


}