import { FastifyReply, FastifyRequest } from 'fastify'
import getDB from '../../../utils/getDB'
import { ServicosDAO } from '../../../models/servicos/servicos'
import { ServicoType } from 'shared'
import { FornecedoresDAO } from '../../../models/fornecedores/fornecedores'

export class ServicosController {
  async GET(req: FastifyRequest, res: FastifyReply): Promise<ServicoType[]> {
    const db = await getDB()
    const servicosDao = new ServicosDAO(db)

    const result = await servicosDao.getAll()

    db.close()
    return result
  }

  async getById(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const servicosDao = new ServicosDAO(db)

    const { id } = req.params as { id: number }
    const result = await servicosDao.getById(id)

    db.close()
    return result
  }

  async POST(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const servicosDao = new ServicosDAO(db)

    const { nome, descricao } = req.body as { nome: string; descricao: string }
    const result = await servicosDao.insertOne({
      nome,
      descricao,
    })

    db.close()
    return {
      id: result,
      nome,
      descricao,
    }
  }

  async PUT(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const servicosDao = new ServicosDAO(db)

    const { id } = req.params as { id: number }
    const { nome, descricao } = req.body as { nome: string; descricao: string }
    const result = await servicosDao.updateOne(id, {
      nome,
      descricao,
    })

    db.close()
    return {
      success: Boolean(result),
    }
  }

  async DELETE(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const servicosDao = new ServicosDAO(db)
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id } = req.params as { id: number }

    await fornecedoresDao.desassociarServicoPorServico(id)
    const changes = await servicosDao.deleteOne(id)

    db.close()
    return {
      success: Boolean(changes),
    }
  }
}
