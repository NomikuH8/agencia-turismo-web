import { FastifyInstance } from 'fastify'
import { FornecedoresController } from '../../../controllers/v1/fornecedores/fornecedores'

export default async function fornecedores(fastify: FastifyInstance) {
  fastify.get('/api/v1/fornecedores', async (req, res) => {
    return await new FornecedoresController().GET(req, res)
  })

  fastify.get('/api/v1/fornecedores/:id', async (req, res) => {
    return await new FornecedoresController().getById(req, res)
  })

  fastify.post('/api/v1/fornecedores', async (req, res) => {
    return await new FornecedoresController().POST(req, res)
  })

  fastify.put('/api/v1/fornecedores/:id', async (req, res) => {
    return await new FornecedoresController().PUT(req, res)
  })

  fastify.delete('/api/v1/fornecedores/:id', async (req, res) => {
    return await new FornecedoresController().DELETE(req, res)
  })

  fastify.get('/api/v1/fornecedores/:id/servicos', async (req, res) => {
    return await new FornecedoresController().getServicosAssociados(req, res)
  })

  fastify.get('/api/v1/fornecedores/:id/servicos/:servicoId', async (req, res) => {
    return await new FornecedoresController().getServicosAssociadosById(req, res)
  })

  fastify.post('/api/v1/fornecedores/:id/servicos', async (req, res) => {
    return await new FornecedoresController().associarServico(req, res)
  })

  fastify.put('/api/v1/fornecedores/:id/servicos/:servicoId', async (req, res) => {
    return await new FornecedoresController().atualizarAssociacao(req, res)
  })

  fastify.delete('/api/v1/fornecedores/:id/servicos/:servicoId', async (req, res) => {
    return await new FornecedoresController().desassociarServico(req, res)
  })
}
