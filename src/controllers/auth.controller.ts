import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user";
import bcrypt from 'bcrypt';

export class AuthController{

    async login(request: Request, response: Response) {
        const { login, password } = request.body;
        const user = await User.findOne({ where: { usuario: login } });
        if (!user) {
            return response
                .status(400)
                .json({ message: "Usuario o Contraseña incorrectos" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response
                .status(400)
                .json({ message: "Usuario o Contraseña incorrectos" });
        }
        const token = this._generateToken(user);
        return response
            .status(200)
            .json({ token, fullname: `${user.name} ` });
    }

    private _generateToken(user: User) {
        const token = jwt.sign({ id: user.id }, "secret-key-2024", {
            expiresIn: "1h",
        });
        return token;
    }

    async checkAuthStatus(request: Request, response: Response) {
        const user = request.user!;
        return response
            .status(200)
            .json({ fullname: `${user.name}` });
    }

}