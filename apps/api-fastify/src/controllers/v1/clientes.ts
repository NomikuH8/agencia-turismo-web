import { FastifyReply, FastifyRequest } from 'fastify'
import { ClienteType } from '../../interfaces/cliente'
import { ClientesDAO } from '../../models/clientes'

export class ClientesController {
  async GET(req: FastifyRequest, res: FastifyReply): Promise<ClienteType[]> {
    const clientesDao = new ClientesDAO()

    const clientes = await clientesDao.getAll()
    return clientes
  }
}
