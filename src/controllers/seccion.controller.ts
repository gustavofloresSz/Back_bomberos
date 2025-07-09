import { Request, Response } from "express";
import { Seccion } from "../entities/seccion";


export class SeccionController {
    async getSeccion(req: Request, res: Response) {
        const seccion = await Seccion.find();
        res.json(seccion);
    }
    
    async addSeccion(request: Request, response: Response) {
        const { name } = request.body;
        if (!name || name.trim() === "") {
            return response.status(400).json({ message: "El nombre es obligatorio" });
        }
        const seccion = Seccion.create({ name });
        await seccion.save();
        return response.status(200).json({ name: seccion.name });
    }
    async updateSeccion(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        const seccion = await Seccion.findOneBy({ id: Number(id) });
        if (!seccion) {
            return res.status(404).json({ message: "Sección no encontrada" });
        }
        seccion.name = name;
        await seccion.save();
        return res.status(200).json({ message: "Sección actualizada", seccion });
    }

    async deleteSeccion(req: Request, res: Response) {
        const { id } = req.params;
        const seccion = await Seccion.findOneBy({ id: Number(id) });
        if (!seccion) {
            return res.status(404).json({ message: "Sección no encontrada" });
        }
        await seccion.remove();
        return res.status(200).json({ message: "Sección eliminada correctamente" });
    }
}