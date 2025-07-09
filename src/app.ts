import { AppRoutes } from "./routes";
import { Server } from "./server";

(() => {
  main();
})();

function main() {
  const server = new Server({ routes: AppRoutes.routes });
  server.start();
}