import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { paths } from '../config/paths'
import Database from 'better-sqlite3'

const srcPath = resolve(__dirname, '..')
const configPath = resolve(srcPath, 'config')

function main(): void {
  const portsExamplePath = resolve(configPath, 'ports.example.ts')
  const portsPath = resolve(configPath, 'ports.ts')
  if (!existsSync(portsPath)) {
    copyFileSync(portsExamplePath, portsPath)
  }

  const pathsExamplePath = resolve(configPath, 'paths.example.ts')
  const pathsPath = resolve(configPath, 'paths.ts')
  if (!existsSync(pathsPath)) {
    copyFileSync(pathsExamplePath, pathsPath)
  }

  const databasePath = paths.db
  if (!existsSync(databasePath)) {
    mkdirSync(databasePath)
  }

  const databaseFilePath = resolve(paths.db, 'database.db')
  if (existsSync(databaseFilePath)) return

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
}

main()
