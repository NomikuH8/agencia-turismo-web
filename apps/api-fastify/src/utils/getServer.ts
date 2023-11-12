import { fastifyAutoload } from '@fastify/autoload'
import { FastifyInstance, fastify } from 'fastify'
import { fastifyStatic } from '@fastify/static'
import { fastifyCors } from '@fastify/cors'
import { join } from 'path'

export default async function getServer(): Promise<FastifyInstance> {
  const server = fastify()

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

  await server.ready()

  return await server
}
