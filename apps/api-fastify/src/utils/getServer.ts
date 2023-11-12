import { fastifyAutoload } from '@fastify/autoload'
import { FastifyInstance, fastify } from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifyStatic } from '@fastify/static'
import { fastifyCors } from '@fastify/cors'
import { join } from 'path'
import { openApi } from './openapi'

export default async function getServer(): Promise<FastifyInstance> {
  const server = fastify({
    logger: true,
  })

  await server.register(fastifyAutoload, {
    dir: join(__dirname, '..', 'routes'),
    dirNameRoutePrefix: false,
  })

  await server.register(fastifyCors, {
    origin: '*',
  })

  await server.register(fastifyStatic, {
    root: join(__dirname, '..', '..', 'public'),
  })

  await server.register(fastifySwagger, {
    openapi: openApi,
    hideUntagged: true,
  })

  return await server
}
