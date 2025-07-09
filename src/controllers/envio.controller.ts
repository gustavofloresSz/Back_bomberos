import { Request, Response } from "express";
import { Envio } from "../entities/envio";
import { Archivo } from "../entities/archivo";
import { User } from "../entities/user";
import { In } from "typeorm";

export class EnvioController {
  async createEnvio(req: Request, res: Response) {
    try {
      const emisor: User = req.user!;
      const { mensaje, receptores } = req.body;
      const archivos = req.files as Express.Multer.File[];

      if ((!mensaje || mensaje.trim() === '') && (!archivos || archivos.length === 0)) {
        return res.status(400).json({ message: "Debe enviar un mensaje o al menos un archivo" });
      }

      if (!receptores || receptores.length === 0) {
        return res.status(400).json({ message: "Debe indicar al menos un receptor" });
      }

      const receptorIds = Array.isArray(receptores) ? receptores : [receptores];
      const usuariosDestino = await User.find({ where: { id: In(receptorIds) } });

      if (usuariosDestino.length === 0) {
        return res.status(404).json({ message: "Receptores no encontrados" });
      }

      for (const receptor of usuariosDestino) {
        const envio = new Envio();
        envio.mensaje = mensaje ?? null;
        envio.emisor = emisor;
        envio.receptor = receptor;
        envio.archivos = [];

        await envio.save();

        if (archivos && archivos.length > 0) {
          for (const file of archivos) {
            const archivo = new Archivo();
            archivo.name = file.filename;
            archivo.name_original = file.originalname;
            archivo.envio = envio;
            await archivo.save();
            envio.archivos.push(archivo);
          }
        }
      }

      return res.status(201).json({ message: "Envío creado exitosamente" });

    } catch (error) {
      console.error("Error al crear envío:", error);
      return res.status(500).json({ message: "Error al procesar el envío" });
    }
  }

  async getInbox(req: Request, res: Response) {
    const currentUser = req.user!;
    const inbox = await Envio.find({ where: { receptor: { id: currentUser.id } }, relations: ["emisor", "archivos"] });
    return res.status(200).json(inbox);
  }

  async getConversacion(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const otroId = parseInt(req.params.usuarioId);

      if (isNaN(otroId)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const historial = await Envio.find({
        where: [
          { emisor: { id: userId }, receptor: { id: otroId } },
          { emisor: { id: otroId }, receptor: { id: userId } }
        ],
        order: { fecha_envio: 'ASC' },
        relations: ['emisor', 'receptor', 'archivos']
      });

      return res.status(200).json(historial);
    } catch (error) {
      console.error("Error al obtener conversación:", error);
      return res.status(500).json({ message: "Error al obtener conversación" });
    }
  }

  async getUsuariosEnviaronMensajes(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const page = parseInt(req.query.page as string) || 0;
    const size = parseInt(req.query.size as string) || 10;
    const skip = page * size;

    const mensajes = await Envio.find({
      where: [
        { receptor: { id: userId } },
        { emisor: { id: userId } }
      ],
      relations: ["emisor", "receptor", "archivos"],
      order: { fecha_envio: "DESC" },
    });

    const conversaciones = new Map<number, any>();

    for (const envio of mensajes) {
      const otroUsuario = envio.emisor.id === userId ? envio.receptor : envio.emisor;

      if (!conversaciones.has(otroUsuario.id)) {
        conversaciones.set(otroUsuario.id, {
          id: otroUsuario.id,
          name: otroUsuario.name,
          mensage: envio.mensaje,
          fecha_envio: envio.fecha_envio,
          archivos: envio.archivos,
        });
      }
    }

    const todasLasConversaciones = Array.from(conversaciones.values());

    const paginadas = todasLasConversaciones.slice(skip, skip + size);

    return res.json({
      total: todasLasConversaciones.length,
      data: paginadas
    });
  }

}