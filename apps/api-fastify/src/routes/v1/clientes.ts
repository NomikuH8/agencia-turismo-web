import { FastifyInstance } from 'fastify'
import { ClientesController } from '../../controllers/v1/clientes'

export default async function clientes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/api/v1/clientes', async (req, res) => {
    await new ClientesController().GET(req, res)
  })
}
