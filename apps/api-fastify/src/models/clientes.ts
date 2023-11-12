import { ClienteType } from '../interfaces/cliente'
import getDB from '../utils/getDB'

export class ClientesDAO {
  async getAll(): Promise<ClienteType[]> {
    const db = await getDB()

    const sql = `SELECT * FROM clientes`

    const result = db.prepare(sql).all() as ClienteType[]
    return result
  }
}
