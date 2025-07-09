import { Router } from "express";
import { UserController } from "./controllers/user.controller";
import { verificarToken } from "./middlewares/auth.middllewares";
import { EnvioController } from "./controllers/envio.controller";
import { upload } from "./middlewares/upload";
import { SeccionController } from "./controllers/seccion.controller";
import { ArchivoController } from "./controllers/archivo.controller";
import { AuthController } from "./controllers/auth.controller";

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
        return router;
    }
}