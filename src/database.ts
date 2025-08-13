import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Seccion } from "./entities/seccion";
import { Envio } from "./entities/envio";
import { Archivo } from "./entities/archivo";
import { Comentario } from "./entities/comentario";
import { Inventario } from "./entities/inventario";
import { ControlOperativo } from "./entities/control_operativo";
import { Hectarea } from "./entities/hectarea";

import dotenv from "dotenv";
dotenv.config();
//conexion con la BD
export const AppDataSource = new DataSource({
    type:'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize:false, //cambiar a False para produccion
    entities:[
        User,
        Seccion,
        Envio,
        Archivo,
        Comentario,
        Inventario,
        ControlOperativo,
        Hectarea
    ]
})