import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Seccion } from "./entities/seccion";
import { Envio } from "./entities/envio";
import { Archivo } from "./entities/archivo";
import { Comentario } from "./entities/comentario";
import { Inventario } from "./entities/inventario";
import { ControlOperativo } from "./entities/control_operativo";
import { Hectarea } from "./entities/hectarea";

//conexion con la BD
export const AppDataSource = new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'1234root',
    database:'bomberos',
    synchronize:true,
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