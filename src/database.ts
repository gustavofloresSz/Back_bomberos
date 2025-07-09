import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Seccion } from "./entities/seccion";
import { Envio } from "./entities/envio";
import { Archivo } from "./entities/archivo";

//conexion con la BD
export const AppDataSource = new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'1234root',
    database:'bomberos',
    synchronize:true,
    entities:[User,Seccion,Envio,Archivo]
 })