import { Database } from 'better-sqlite3'
import { ClienteType } from '../interfaces/cliente'

export class ClientesDAO {
  private db: Database

  constructor(dbParam: Database) {
    this.db = dbParam
  }

  async getAll(): Promise<ClienteType[]> {
    const sql = `SELECT * FROM cliente`

    const result = this.db.prepare(sql).all() as ClienteType[]
    return result
  }

  async insertOne(toInsert: { nome: string; email: string }): Promise<number | bigint> {
    const { nome, email } = toInsert

    const sql = `INSERT INTO cliente (nome, email) VALUES (?, ?)`

    const result = this.db.prepare(sql).run([nome, email])
    return result.lastInsertRowid
  }
}
