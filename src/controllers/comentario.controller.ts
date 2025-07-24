import { Request, Response } from "express";
import { Comentario } from "../entities/comentario";

export class ComentarioController {

  async getComentario(req: Request, res: Response) {
    const comentario = await Comentario.find();
    res.json(comentario);
  }

  async addComentario(req: Request, res: Response) {
    const { descripcion, tipo_incendio, ubicacion } = req.body;
    const comentario = Comentario.create({ descripcion, tipo_incendio, ubicacion });
    await comentario.save();
    res.status(201).json(comentario);
  }

  async deleteComentario(req:Request, res:Response){
    const { id } = req.params;
    try {
        const comentario = await Comentario.findOneBy({ id: Number(id) });

        if (!comentario) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        await comentario.remove();
        return res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar comentario' });
    }
  }

}