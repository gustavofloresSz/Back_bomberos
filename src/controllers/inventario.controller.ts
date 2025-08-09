import {Request,Response} from "express";

import { Inventario } from "../entities/inventario";

export class InventarioController {

  async getInventario(req: Request, res: Response) {
    try {
      const tipo = req.query.tipo as string;
      const whereClause = tipo ? { tipo } : {};

      const inventario = await Inventario.find({
        where: whereClause,
      });

      res.json(inventario);
    } catch (error) {
      console.error("Error al obtener inventario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async addInventario(req: Request, res: Response) {
    const { nombre, cantidad_total, cantidad_uso, tipo } = req.body;

    try {
      const item = Inventario.create({
        nombre,
        cantidad_total,
        cantidad_uso,
        tipo,
      });

      await item.save();
      res.status(201).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear inventario' });
    }
  }

  async updateInventario(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, cantidad_total, cantidad_uso, tipo } = req.body;

    try {
      const item = await Inventario.findOneBy({ id: Number(id) });

      if (!item) {
        return res.status(404).json({ message: 'Inventario no encontrado' });
      }

      item.nombre = nombre ?? item.nombre;
      item.cantidad_total = cantidad_total ?? item.cantidad_total;
      item.cantidad_uso = cantidad_uso ?? item.cantidad_uso;
      item.tipo = tipo ?? item.tipo;

      await item.save();
      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar inventario' });
    }
  }

  async deleteInventario(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const item = await Inventario.findOneBy({ id: Number(id) });

      if (!item) {
        return res.status(404).json({ message: 'Inventario no encontrado' });
      }

      await item.remove();
      res.status(200).json({ message: 'Inventario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar inventario' });
    }
  }

}