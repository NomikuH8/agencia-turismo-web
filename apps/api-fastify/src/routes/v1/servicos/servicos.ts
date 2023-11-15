import { FastifyInstance } from 'fastify'
import { ServicosController } from '../../../controllers/v1/servicos/servicos'

export default async function fornecedores(fastify: FastifyInstance) {
  fastify.get('/api/v1/servicos', async (req, res) => {
    return await new ServicosController().GET(req, res)
  })

  fastify.get('/api/v1/servicos/:id', async (req, res) => {
    return await new ServicosController().getById(req, res)
  })

  fastify.post('/api/v1/servicos', async (req, res) => {
    return await new ServicosController().POST(req, res)
  })

  fastify.put('/api/v1/servicos/:id', async (req, res) => {
    return await new ServicosController().PUT(req, res)
  })

  fastify.delete('/api/v1/servicos/:id', async (req, res) => {
    return await new ServicosController().DELETE(req, res)
  })
}
