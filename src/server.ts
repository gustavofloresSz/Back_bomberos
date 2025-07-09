import express, { Router } from "express";
import cors from "cors";
import { AppDataSource } from "./database";

import http from "http";
import { Server as SocketIOServer } from "socket.io";

interface ServerOptions {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private server = http.createServer(this.app);
  private io = new SocketIOServer(this.server,{
    cors:{
      origin:"http://localhost:4200", //ruta del front
      methods:["GET","POST"],
    }
  });

  constructor({ port = 4000, routes }: ServerOptions) {
    this.port = port;
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

      socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id);
      });
    });
  }

  async start() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.routes);

    try {
      await AppDataSource.initialize();

      this.server.listen(this.port, '0.0.0.0', () => {
        console.log(`Server running with Socket.IO on port ${this.port}`);
      });
    } catch (error) {
      console.log("Error al iniciar el servidor", error);
    }
  }
}