import { Database } from 'better-sqlite3'
import { ClienteType } from '../../interfaces/cliente'
import { InsertOneType, UpdateOneType } from './bodies'

export class ClientesDAO {
  private db: Database

  constructor(dbParam: Database) {
    this.db = dbParam
  }

  async getAll(): Promise<ClienteType[]> {
    const sql = `SELECT * FROM cliente WHERE deletado = 0`

    const result = this.db.prepare(sql).all() as ClienteType[]
    return result
  }

  async getAllWithDeleted(): Promise<ClienteType[]> {
    const sql = `SELECT * FROM cliente`

    const result = this.db.prepare(sql).all() as ClienteType[]
    return result
  }

  async getIdsWithDeleted(ids: number[]): Promise<ClienteType[]> {
    for (const id of ids) {
      if (typeof id !== 'number') return []
    }

    const sql = `SELECT * FROM cliente WHERE id IN (${ids.join(',')})`

    const result = this.db.prepare(sql).all() as ClienteType[]
    return result
  }

  async getOne(id: number): Promise<ClienteType> {
    const sql = `SELECT * FROM cliente WHERE id = ? AND deletado = 0`

    const result = this.db.prepare(sql).get(id) as ClienteType
    return result
  }

  async getOneWithDeleted(id: number): Promise<ClienteType> {
    const sql = `SELECT * FROM cliente WHERE id = ?`

    const result = this.db.prepare(sql).get(id) as ClienteType
    return result
  }

  async insertOne(toInsert: InsertOneType): Promise<number | bigint> {
    const { nome, email } = toInsert

    const sql = `INSERT INTO cliente (nome, email) VALUES (?, ?)`

    const result = this.db.prepare(sql).run([nome, email])
    return result.lastInsertRowid
  }

  async updateOne(toUpdate: UpdateOneType): Promise<number> {
    const { id, nome, email } = toUpdate

    const sql = `
      UPDATE cliente
      SET nome = ?,
          email = ?
      WHERE id = ?
    `

    const result = this.db.prepare(sql).run([nome, email, id])
    return result.changes
  }

  async deleteOne(id: number): Promise<number> {
    const sql = `
      UPDATE cliente
      SET deletado = 1
      WHERE id = ?
    `

    const result = this.db.prepare(sql).run([id])
    return result.changes
  }
}
