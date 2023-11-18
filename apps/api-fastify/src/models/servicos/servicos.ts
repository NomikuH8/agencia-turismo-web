import { Database } from 'better-sqlite3'
import { InsertOneType, UpdateOneType } from './bodies'
import { ServicoType } from 'shared'

export class ServicosDAO {
  private db: Database

  constructor(dbParam: Database) {
    this.db = dbParam
  }

  async getAll() {
    const sql = `
      SELECT *
      FROM servico
    `

    const result = this.db.prepare(sql).all()
    return result as ServicoType[]
  }

  async getById(id: number) {
    const sql = `
      SELECT *
      FROM servico
      WHERE id = ?
    `

    const result = this.db.prepare(sql).get([id])
    return result as ServicoType
  }

  async insertOne(toInsert: InsertOneType) {
    const { nome, descricao } = toInsert
    const sql = `
      INSERT INTO servico (
        nome,
        descricao
      ) values (
        ?,
        ?
      )
    `

    const result = this.db.prepare(sql).run([nome, descricao])
    return result.lastInsertRowid as number
  }

  async updateOne(id: number, toUpdate: UpdateOneType) {
    const { nome, descricao } = toUpdate

    const sql = `
      UPDATE servico
      SET nome = ?,
          descricao = ?
      WHERE id = ?
    `

    const result = this.db.prepare(sql).run([nome, descricao, id])
    return result.changes
  }

  async deleteOne(id: number) {
    const sql = `
      UPDATE servico
      SET deletado = 1
      WHERE id = ?
    `

    const result = this.db.prepare(sql).run([id])
    return result.changes
  }

  async undoDeleteOne(id: number) {
    const sql = `
      UPDATE servico
      SET deletado = 0
      WHERE id = ?
    `

    const result = this.db.prepare(sql).run([id])
    return result.changes
  }
}
