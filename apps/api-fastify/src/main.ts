import { ports } from "./config/ports";
import getServer from "./utils/getServer";

async function main() {
  const server = await getServer()
  server.listen({
    port: ports.http
  })
}

main()