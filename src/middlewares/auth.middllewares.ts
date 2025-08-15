import { NextFunction,Request, Response } from "express";
import { User } from "../entities/user";
import jwt from "jsonwebtoken";

export const verificarToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("Authorization");
    if (!authorization) return res.status(401).json({ error: "Sin token" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Token invalido" });
  
    const token = authorization.split(" ").at(1) || "";
  
    try {
      const payload = jwt.verify(token, "secret-key-2024") as { id: number };
      if (!payload) {
        return res.status(401).json({ error: "Invalid token" });
      }
      const user = await User.findOne({ where: { id: payload.id } });
      console.log("user found",user)
      if (!user) {
        return res.status(401).json({ error: "Invalid token - user not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      // console.log(error);
      res.status(401).json({ error: "Unauthorized" });
    }
  };