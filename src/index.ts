import { App } from "./app";
import { Database } from "./database";

async function main() {
  const app = new App(3001);
  await app.listen();
}
main();