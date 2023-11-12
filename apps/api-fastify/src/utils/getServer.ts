import { fastifyAutoload } from "@fastify/autoload";
import { fastifySwagger } from "@fastify/swagger";
import { fastifyStatic } from "@fastify/static";
import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { join } from "path";
import { openApi } from "./openapi";

export default async function getServer() {
  const server = fastify({
    logger: true,
  })

  server.register(fastifyAutoload, {
    dir: join(__dirname, '..', 'routes'),
    dirNameRoutePrefix: false
  })

  server.register(fastifyCors, {
    origin: '*'
  })

  server.register(fastifyStatic, {
    root: join(__dirname, '..', '..', 'public')
  })

  server.register(fastifySwagger, {
    openapi: openApi,
    hideUntagged: true,
  })

  return server
}