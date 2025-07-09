import { Request, Response } from "express";
import { User } from "../entities/user";
import bcrypt from 'bcrypt';
import { Not } from "typeorm";
import { Seccion } from "../entities/seccion";

export class UserController {

  async getUser(request: Request, response: Response) {
    //metodo para obtener users excluyendo al logeado
    const userId = request.user?.id;
    if (!userId) {
      return response.status(401).json({ message: "No autorizado" });
    }
    const users = await User.find({
      where: {
        id: Not(userId),
      },
      relations: ["seccion"]
    });
    response.json(users);
  }

  async getUsuarioActual(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const user = await User.findOne({
      where: { id: userId },
      select: ["id", "rol", "name", "usuario"]
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  }



  async getFullUsers(req: Request, res: Response) {
    const users = await User.find({ relations: ["seccion"] });
    res.json(users);
  }

  async registerUser(request: Request, response: Response) {
    const { name, usuario, password, rol, seccion } = request.body;
    const user = User.create({ name, usuario, password, rol, seccion });
    await user.save();
    return response
      .status(200)
      .json({ fullname: `${user.name} ${user.usuario}` });
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, rol, seccion, password } = req.body;

    const user = await User.findOne({
      where: { id: Number(id) },
      relations: ['seccion'],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (name !== undefined) user.name = name;
    if (rol !== undefined) user.rol = rol;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (seccion !== undefined) {
      const seccionEntity = await Seccion.findOneBy({ id: seccion });
      if (!seccionEntity) {
        return res.status(400).json({ message: "Sección no válida" });
      }
      user.seccion = seccionEntity;
    }
    await user.save();
    return res.status(200).json({ message: "Usuario actualizado", user });
  }


  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findOneBy({ id: Number(id) });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.remove();
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  }

  async changePasswordUser(request: Request, response: Response) {
    const { currentPassword, newPassword } = request.body;
    const userData = request.user!;

    const user = await User.findOne({ where: { id: userData.id } });
    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return response.status(400).json({ message: "Contraseña actual incorrecta" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return response.status(200).json({ message: "Contraseña actualizada correctamente" });
  }

  async getUsuarioPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const user = await User.findOne({ where: { id }, relations: ["seccion"] });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  }
  async getUserIdActualSocket(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "No autorizado" });
    }
    return res.status(200).json({ id: userId });
  }

  async getPaginatedUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 0;
      const size = parseInt(req.query.size as string) || 10;

      const [users, total] = await User.findAndCount({
        relations: ['seccion'],
        skip: page * size,
        take: size,
        order: { name: 'ASC' } // orden opcional por nombre
      });

      return res.status(200).json({
        data: users,
        total
      });
    } catch (error) {
      console.error("Error paginando usuarios:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

}