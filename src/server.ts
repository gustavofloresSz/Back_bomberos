import express, { Router } from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { AppDataSource } from "./database";

import dotenv from "dotenv";
import path from "path";
dotenv.config();

interface ServerOptions {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private server = http.createServer(this.app);

  private io = new SocketIOServer(this.server, {
    cors: {
      origin:  '*', 
      methods: ["GET", "POST"],
    },
  });

  constructor({ port, routes }: ServerOptions) {
    this.port = port || Number(process.env.PORT) || 4000;
    this.routes = routes;
    this.configureSocketEvents();
  }

  private configureSocketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Nuevo cliente conectado", socket.id);

      socket.on("mensaje", (data) => {
        console.log("Mensaje recibido:", data);
        this.io.emit("mensaje", data);
      });

      socket.on("comentario", (data) => {
        console.log("Comentario recibido:", data);
        this.io.emit("comentario", data);
      });

      socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id);
      });
    });
  }

  async start() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, '..', 'public')))
    this.app.use('/api',this.routes);
    this.app.get('/*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))})
    try {
      await AppDataSource.initialize();

      this.server.listen(this.port, () => {
        console.log(`Server running with Socket.IO on port ${this.port}`);
      });
    } catch (error) {
      console.log("Error al iniciar el servidor", error);
    }
  }
}
