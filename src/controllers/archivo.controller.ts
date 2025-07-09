import { Request, Response } from "express";
import path from "path";
import { Archivo } from "../entities/archivo";
import * as fs from 'fs';


export class ArchivoController{
    async descargarArchivo(req: Request, res: Response) {
    const { filename } = req.params;
    const user = req.user!;

    try {
      const archivo = await Archivo.findOne({
        where: { name: filename },
        relations: ["envio", "envio.receptor", "envio.emisor"]
      });

      if (!archivo) {
        return res.status(404).json({ message: "Archivo no encontrado en base de datos" });
      }
      const esReceptor = archivo.envio.receptor.id === user.id;
      const esEmisor = archivo.envio.emisor.id === user.id;

      if (!esReceptor && !esEmisor) {
        return res.status(403).json({ message: "No autorizado para descargar este archivo" });
      }

      const filePath = path.join(__dirname, "..", "..", "uploads", filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Archivo físico no encontrado" });
      }

      return res.download(filePath, archivo.name_original);
    } catch (err) {
      console.error("Error al descargar archivo:", err);
      return res.status(500).json({ message: "Error interno al descargar el archivo" });
    }
  }
}