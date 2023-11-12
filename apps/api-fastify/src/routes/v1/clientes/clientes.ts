import { FastifyInstance } from 'fastify'
import { ClientesController } from '../../../controllers/v1/clientes/clientes'

export default async function clientes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/api/v1/clientes', async (req, res) => {
    return await new ClientesController().GET(req, res)
  })

  fastify.post('/api/v1/clientes', async (req, res) => {
    return await new ClientesController().POST(req, res)
  })
}
