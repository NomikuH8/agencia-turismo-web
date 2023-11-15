import { Database } from 'better-sqlite3'
import {
  InsertAssociateServicoType,
  InsertOneType,
  ServicosAssociadosType,
  UpdateAssociateServicoType,
  UpdateOneType,
} from './bodies'
import { FornecedorType } from '../../interfaces/fornecedor'

export class FornecedoresDAO {
  private db: Database

  constructor(dbParam: Database) {
    this.db = dbParam
  }

  async getAll() {
    const sql = `
      SELECT *
      FROM fornecedor
    `

    const result = this.db.prepare(sql).all()
    return result as FornecedorType[]
  }

  async getById(id: number) {
    const sql = `
      SELECT *
      FROM fornecedor
      WHERE id = ?
    `

    const result = this.db.prepare(sql).get([id])
    return result as FornecedorType
  }

  async insertOne(toInsert: InsertOneType) {
    const { nome, site } = toInsert
    const sql = `
      INSERT INTO fornecedor (
        nome,
        site
      ) values (
        ?,
        ?
      )
    `

    const result = this.db.prepare(sql).run([nome, site])
    return result.lastInsertRowid as number
  }

  async updateOne(id: number, toUpdate: UpdateOneType) {
    const { nome, site } = toUpdate

    const sql = `
      UPDATE fornecedor
      SET nome = ?,
          site = ?
      WHERE id = ?
    `

    const result = this.db.prepare(sql).run([nome, site, id])
    return result.changes
  }

  async deleteOne(id: number): Promise<number> {
    const sql = `
      UPDATE fornecedor
      SET deletado = 1
      WHERE id = ?
    `

    const result = this.db.prepare(sql).run([id])
    return result.changes
  }

  async undoDeleteOne(id: number): Promise<number> {
    const sql = `
      UPDATE fornecedor
      SET deletado = 0
      WHERE id = ?
    `

    const result = this.db.prepare(sql).run([id])
    return result.changes
  }

  async getServicosAssociados(fornecedorId: number): Promise<ServicosAssociadosType[]> {
    const sql = `
      SELECT
        servico_id,
        nome,
        descricao,
        modalidade_pagamento,
        valor
      FROM fornecedor_servico fs
      INNER JOIN servico s ON s.id = fs.servico_id
      WHERE fornecedor_id = ?
    `

    const result = this.db.prepare(sql).all(fornecedorId)
    return result as ServicosAssociadosType[]
  }

  async getOneServicoAssociado(
    fornecedorId: number,
    servicoId: number,
  ): Promise<ServicosAssociadosType> {
    const sql = `
      SELECT
        servico_id,
        nome,
        descricao,
        modalidade_pagamento,
        valor
      FROM fornecedor_servico fs
      INNER JOIN servico s ON s.id = fs.servico_id
      WHERE fornecedor_id = ?
            AND servico_id = ?
    `

    const result = this.db.prepare(sql).get([fornecedorId, servicoId])
    return result as ServicosAssociadosType
  }

  async associarServico(insert: InsertAssociateServicoType): Promise<number> {
    const { fornecedorId, servicoId, modalidade_pagamento, valor } = insert

    const sql = `
      INSERT INTO fornecedor_servico (
        fornecedor_id,
        servico_id,
        modalidade_pagamento,
        valor
      ) values (
        ?,
        ?,
        ?,
        ?
      )
    `

    const result = this.db.prepare(sql).run(fornecedorId, servicoId, modalidade_pagamento, valor)
    return result.lastInsertRowid as number
  }

  async atualizarAssociacao(update: UpdateAssociateServicoType): Promise<number> {
    const { fornecedorId, servicoId, modalidade_pagamento, valor } = update

    const sql = `
      UPDATE fornecedor_servico
      SET modalidade_pagamento = ?,
          valor = ?
      WHERE fornecedor_id = ?
            AND servico_id = ?
    `

    const result = this.db.prepare(sql).run(modalidade_pagamento, valor, fornecedorId, servicoId)
    return result.changes
  }

  async desassociarServicoPorFornecedor(fornecedorId: number): Promise<number> {
    const sql = `
      DELETE FROM fornecedor_servico
      WHERE fornecedor_id = ?
    `

    const result = this.db.prepare(sql).run(fornecedorId)
    return result.changes
  }

  async desassociarServicoPorServico(servicoId: number): Promise<number> {
    const sql = `
      DELETE FROM fornecedor_servico
      WHERE servico_id = ?
    `

    const result = this.db.prepare(sql).run(servicoId)
    return result.changes
  }

  async desassociarServico(fornecedorId: number, servicoId: number): Promise<number> {
    const sql = `
      DELETE FROM fornecedor_servico
      WHERE fornecedor_id = ?
            AND servico_id = ?
    `

    const result = this.db.prepare(sql).run(fornecedorId, servicoId)
    return result.changes
  }
}
