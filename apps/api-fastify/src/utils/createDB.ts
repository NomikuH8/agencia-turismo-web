import { resolve } from 'path'
import { existsSync, mkdirSync, unlinkSync } from 'fs'
import Database from 'better-sqlite3'

export function createDB() {
  const rootPath = resolve(__dirname, '..', '..', 'database')

  const databaseFilePath = resolve(rootPath, 'database.db')
  if (!existsSync(rootPath)) {
    mkdirSync(rootPath)
  }

  if (existsSync(databaseFilePath)) {
    unlinkSync(databaseFilePath)
  }

  const db = new Database(databaseFilePath)
  db.prepare(
    `
    CREATE TABLE cliente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      deletado INTEGER NOT NULL DEFAULT 0
    )
  `,
  ).run()
  db.prepare(
    `
    CREATE TABLE servico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      deletado INTEGER NOT NULL DEFAULT 0
    )
  `,
  ).run()
  db.prepare(
    `
    CREATE TABLE fornecedor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      site TEXT,
      deletado INTEGER NOT NULL DEFAULT 0
    )
  `,
  ).run()
  db.prepare(
    `
    CREATE TABLE fornecedor_servico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fornecedor_id INTEGER NOT NULL,
      servico_id INTEGER NOT NULL,
      modalidade_pagamento TEXT NOT NULL,
      valor REAL NOT NULL
    )
  `,
  ).run()
  db.prepare(
    `
    CREATE TABLE transacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      fornecedor_id INTEGER NOT NULL
    )
  `,
  ).run()
  db.prepare(
    `
    CREATE TABLE transacao_servico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transacao_id INTEGER NOT NULL,
      servico_id INTEGER NOT NULL
    )
  `,
  ).run()
  db.prepare(
    `
    CREATE TABLE informacoes_pagamento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data_vencimento TEXT NOT NULL,
      transacao_id INTEGER NOT NULL,
      valor_cobrado REAL NOT NULL,
      fornecedor_id INTEGER NOT NULL
    )
  `,
  ).run()
  db.close()
}
