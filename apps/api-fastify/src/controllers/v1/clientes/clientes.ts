import { FastifyReply, FastifyRequest } from 'fastify'
import { ClienteType } from '../../../interfaces/cliente'
import { ClientesDAO } from '../../../models/clientes'
import getDB from '../../../utils/getDB'
import { ClientePostBodyType } from './bodies'

export class ClientesController {
  async GET(req: FastifyRequest, res: FastifyReply): Promise<ClienteType[]> {
    const db = await getDB()
    const clientesDao = new ClientesDAO(db)

    const clientes = await clientesDao.getAll()

    db.close()
    return clientes
  }

  async POST(req: FastifyRequest, res: FastifyReply): Promise<{ error: boolean }> {
    const db = await getDB()
    const clientesDao = new ClientesDAO(db)

    const { nome, email } = req.body as ClientePostBodyType
    const operation = await clientesDao.insertOne({
      nome,
      email,
    })

    return {
      error: isNaN(Number(operation)) || operation === 0,
    }
  }
}
