import { Database } from 'better-sqlite3'
import getDB from '../../utils/getDB'
import { FornecedoresDAO } from './fornecedores'
import { createDB } from '../../utils/createDB'

describe('Run Fornecedores DAO', () => {
  let db: Database
  let fornecedoresDao: FornecedoresDAO
  let insertId: number

  beforeAll(async () => {
    createDB()
  })

  beforeEach(async () => {
    db = await getDB()
    fornecedoresDao = new FornecedoresDAO(db)
  })

  afterEach(() => {
    db.close()
  })

  test('getAll', async () => {
    const result = await fornecedoresDao.getAll()
    expect(result).toEqual([])
  })

  test('insertOne', async () => {
    const result = await fornecedoresDao.insertOne({
      nome: '123milhas',
      site: '123milhas.com.br',
    })
    insertId = result
    expect(result).toBe(1)
  })

  test('updateOne', async () => {
    const result = await fornecedoresDao.updateOne(insertId, {
      nome: 'decolar.com',
      site: 'decolar.com',
    })
    expect(result).toBe(1)
  })

  test('getById', async () => {
    const result = await fornecedoresDao.getById(insertId)
    expect(result).toEqual({
      id: insertId,
      nome: 'decolar.com',
      site: 'decolar.com',
      deletado: 0,
    })
  })

  test('deleteOne', async () => {
    const result = await fornecedoresDao.deleteOne(insertId)
    expect(result).toBe(1)
  })

  test('getById deleted', async () => {
    const result = await fornecedoresDao.getById(insertId)
    expect(result).toEqual({
      id: insertId,
      nome: 'decolar.com',
      site: 'decolar.com',
      deletado: 1,
    })
  })
})
