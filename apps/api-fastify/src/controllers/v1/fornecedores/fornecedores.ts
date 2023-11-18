import { FastifyReply, FastifyRequest } from 'fastify'
import getDB from '../../../utils/getDB'
import { FornecedoresDAO } from '../../../models/fornecedores/fornecedores'
import { FornecedorType } from 'shared'
import { ServicosAssociadosType } from '../../../models/fornecedores/bodies'

export class FornecedoresController {
  async GET(req: FastifyRequest, res: FastifyReply): Promise<FornecedorType[]> {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const result = await fornecedoresDao.getAll()

    db.close()
    return result
  }

  async getById(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id } = req.params as { id: number }
    const result = await fornecedoresDao.getById(id)

    db.close()
    return result
  }

  async POST(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { nome, site } = req.body as { nome: string; site: string }
    const result = await fornecedoresDao.insertOne({
      nome,
      site,
    })

    db.close()
    return {
      id: result,
      nome,
      site,
    }
  }

  async PUT(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id } = req.params as { id: number }
    const { nome, site } = req.body as { nome: string; site: string }
    const result = await fornecedoresDao.updateOne(id, {
      nome,
      site,
    })

    db.close()
    return {
      success: Boolean(result),
    }
  }

  async DELETE(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id } = req.params as { id: number }
    await fornecedoresDao.desassociarServicoPorFornecedor(id)
    const changes = await fornecedoresDao.deleteOne(id)

    db.close()
    return {
      success: Boolean(changes),
    }
  }

  async getServicosAssociados(
    req: FastifyRequest,
    res: FastifyReply,
  ): Promise<ServicosAssociadosType[]> {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id } = req.params as { id: number }
    const result = await fornecedoresDao.getServicosAssociados(id)

    return result
  }

  async getServicosAssociadosById(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id, servicoId } = req.params as { id: number; servicoId: number }
    const result = await fornecedoresDao.getOneServicoAssociado(id, servicoId)

    return result
  }

  async associarServico(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id } = req.params as { id: number }
    const { servico_id, modalidade_pagamento, valor } = req.body as {
      servico_id: number
      modalidade_pagamento: string
      valor: number
    }

    const result = await fornecedoresDao.associarServico({
      fornecedorId: id,
      servicoId: servico_id,
      modalidade_pagamento,
      valor,
    })

    return {
      success: Boolean(result),
    }
  }

  async atualizarAssociacao(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id, servicoId } = req.params as { id: number; servicoId: number }
    const { modalidade_pagamento, valor } = req.body as {
      modalidade_pagamento: string
      valor: number
    }

    const changes = await fornecedoresDao.atualizarAssociacao({
      fornecedorId: id,
      servicoId,
      modalidade_pagamento,
      valor,
    })

    return changes
  }

  async desassociarServico(req: FastifyRequest, res: FastifyReply) {
    const db = await getDB()
    const fornecedoresDao = new FornecedoresDAO(db)

    const { id, servicoId } = req.params as { id: number; servicoId: number }

    const result = await fornecedoresDao.desassociarServico(id, servicoId)

    return {
      success: Boolean(result),
    }
  }
}
