import { FastifyReply, FastifyRequest } from 'fastify'
import { ClienteType } from 'shared'
import { ClientesDAO } from '../../../models/clientes/clientes'
import getDB from '../../../utils/getDB'
import {
  ClienteDeleteReturnType,
  ClientePostBodyType,
  ClientePostReturnType,
  ClientePutBodyType,
  ClientePutReturnType,
} from './bodies'

export class ClientesController {
  async GET(req: FastifyRequest, res: FastifyReply): Promise<ClienteType[]> {
    const db = await getDB()
    const clientesDao = new ClientesDAO(db)

    const clientes = await clientesDao.getAllWithDeleted()

    db.close()
    return clientes
  }

  async getById(req: FastifyRequest, res: FastifyReply): Promise<ClienteType> {
    const db = await getDB()
    const clientesDao = new ClientesDAO(db)

    const { id } = req.params as { id: number }
    const cliente = await clientesDao.getOne(id)

    db.close()
    return cliente
  }

  async POST(req: FastifyRequest, res: FastifyReply): Promise<ClientePostReturnType> {
    const db = await getDB()
    const clientesDao = new ClientesDAO(db)

    const { nome, email } = req.body as ClientePostBodyType
    const newId = await clientesDao.insertOne({
      nome,
      email,
    })

    db.close()
    return {
      id: Number(newId),
      nome,
      email,
    }
  }

  async PUT(req: FastifyRequest, res: FastifyReply): Promise<ClientePutReturnType> {
    const db = await getDB()
    const clientesDao = new ClientesDAO(db)

    const { id } = req.params as { id: number }
    const { nome, email } = req.body as ClientePutBodyType
    const result = await clientesDao.updateOne(id, {
      nome,
      email,
    })

    db.close()
    return {
      success: Boolean(result),
    }
  }

  async DELETE(req: FastifyRequest, res: FastifyReply): Promise<ClienteDeleteReturnType> {
    const db = await getDB()
    const clientesDao = new ClientesDAO(db)

    const { id } = req.params as { id: number }
    const result = await clientesDao.getOneWithDeleted(id)

    let changes = 0
    if (result.deletado === 0) changes = await clientesDao.deleteOne(id)
    else changes = await clientesDao.undoDeleteOne(id)

    db.close()
    return {
      success: Boolean(changes),
    }
  }
}
