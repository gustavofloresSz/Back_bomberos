import { AppRoutes } from "./routes";
import { Server } from "./server";

(() => {
  main();
})();

function main() {
  const server = new Server({ port: Number(process.env.PORT), routes: AppRoutes.routes });
  server.start();
}