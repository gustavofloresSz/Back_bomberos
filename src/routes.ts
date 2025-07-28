import { Router } from "express";
import { UserController } from "./controllers/user.controller";
import { verificarToken } from "./middlewares/auth.middllewares";
import { EnvioController } from "./controllers/envio.controller";
import { upload } from "./middlewares/upload";
import { SeccionController } from "./controllers/seccion.controller";
import { ArchivoController } from "./controllers/archivo.controller";
import { AuthController } from "./controllers/auth.controller";
import { ComentarioController } from "./controllers/comentario.controller";
import { InventarioController } from "./controllers/inventario.controller";
import { ControlOperativoController } from "./controllers/control_operativo.controller";
import { HectareaController } from "./controllers/hectareas.controller";

export class AppRoutes {
    static get routes():Router{
        const router = Router();

        const userController = new UserController();
        router.get("/getUsers",verificarToken,(request,response)=>
          userController.getUser(request,response)
        );
        router.get("/usuario/:id", verificarToken, (req, res) =>
          userController.getUsuarioPorId(req, res)
        );
        router.get("/usuario-id-socket", verificarToken, (req, res) =>
          userController.getUserIdActualSocket(req, res)
        );
        router.get("/usuario-actual", verificarToken, (req, res) =>
          userController.getUsuarioActual(req, res)
        );
        router.get("/getFullUsers",(request,response)=>
            userController.getFullUsers(request,response)
        );
        router.put("/updateUser/:id",(request,response)=>
            userController.updateUser(request,response)
        );
        router.delete("/deleteUser/:id",(request,response)=>
            userController.deleteUser(request,response)
        );
        router.post("/registerUser",(request,response)=>
            userController.registerUser(request,response)
        );
        router.post("/changePassword", verificarToken, (request, response) =>
          userController.changePasswordUser(request, response)
        );
        router.get("/getPageUsers", (req, res) =>
          userController.getPaginatedUsers(req, res)
        );

        
        const authController = new AuthController();
        router.post("/login", (request, response) =>
          authController.login(request, response)
        );
        router.get("/auth", verificarToken, (request, response) =>
          authController.checkAuthStatus(request, response)
        );
        
        
        const envioController = new EnvioController();
        router.post("/crearEnvio",verificarToken,upload.array("archivos", 10),
          (request, response) => envioController.createEnvio(request, response)
        );
        router.get("/getInbox",verificarToken,
          (request, response) => envioController.getInbox(request, response)
        );
        router.get("/chat/:usuarioId",verificarToken,(req, res) => 
          envioController.getConversacion(req, res)
        );
        router.get('/getUsuariosEnviaronMensajes', verificarToken, (req, res) => 
          envioController.getUsuariosEnviaronMensajes(req, res)
        );


        const seccionController =  new SeccionController();
        router.post("/registerSeccion",(request,response)=>
          seccionController.addSeccion(request,response)
        );
        router.get("/getSeccion",(request,response)=>
          seccionController.getSeccion(request,response)
        );
        router.put("/updateSeccion/:id",(request,response)=>
          seccionController.updateSeccion(request,response)
        );
        router.delete("/deleteSeccion/:id",(request,response)=>
          seccionController.deleteSeccion(request,response)
        );


        const archivoController = new ArchivoController();
        router.get("/descargar/:filename", verificarToken,(req, res) => 
          archivoController.descargarArchivo(req, res)
        );


        const comentarioController = new ComentarioController();
        router.post("/addComentario",(req,res)=>
          comentarioController.addComentario(req,res)
        );
        router.get("/getComentario",(req,res)=>
          comentarioController.getComentario(req,res)
        );
        router.delete("/deleteComentario/:id", (req, res) =>
          comentarioController.deleteComentario(req, res)
        );

        const inventarioController = new InventarioController();
        router.post("/addInventario",(req,res)=>
          inventarioController.addInventario(req,res)
        );
        router.get("/getInventario",(req,res)=>
          inventarioController.getInventario(req,res)
        );
        router.put("/updateInventario/:id", (req, res) =>
          inventarioController.updateInventario(req, res)
        );
        router.delete("/deleteInventario/:id", (req, res) =>
          inventarioController.deleteInventario(req, res)
        );


        const controlOperativo = new ControlOperativoController();
        router.post("/addControlOperativo", (req, res) =>
          controlOperativo.addControlOperativo(req, res)
        );
        router.get("/getControlOperativo", (req, res) =>
          controlOperativo.getControlOperativo(req, res)
        );
        router.put("/updateControlOperativo/:id", (req, res) =>
          controlOperativo.updateControlOperativo(req, res)
        );
        router.delete("/deleteControlOperativo/:id", (req, res) =>
          controlOperativo.deleteControlOperativo(req, res)
        );


        const hectareaController = new HectareaController();
        router.get("/getHectarea", (req, res) =>
          hectareaController.getHectarea(req, res)
        )
        router.post("/addHectarea", (req, res) =>
          hectareaController.addHectarea(req, res)
        )
        router.put("/updateHectarea/:id", (req, res) =>
          hectareaController.updateHectarea(req, res)
        );
        router.delete("/deleteHectarea/:id", (req, res) =>
          hectareaController.deleteHectarea(req, res)
        );
        return router;
    }
}