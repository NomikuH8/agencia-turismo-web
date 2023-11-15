import { Database } from 'better-sqlite3'
import getDB from '../../utils/getDB'
import { ServicosDAO } from './servicos'
import { createDB } from '../../utils/createDB'

describe('Run Fornecedores DAO', () => {
  let db: Database
  let servicosDao: ServicosDAO
  let insertId: number

  beforeAll(async () => {
    createDB()
  })

  beforeEach(async () => {
    db = await getDB()
    servicosDao = new ServicosDAO(db)
  })

  afterEach(() => {
    db.close()
  })

  test('getAll', async () => {
    const result = await servicosDao.getAll()
    expect(result).toEqual([])
  })

  test('insertOne', async () => {
    const result = await servicosDao.insertOne({
      nome: 'Passagens aereas',
      descricao: 'Viage com sua família',
    })
    insertId = result
    expect(result).toBe(1)
  })

  test('updateOne', async () => {
    const result = await servicosDao.updateOne(insertId, {
      nome: 'Aluguel de carro',
      descricao: 'Alugue carros para viajar com sua família',
    })
    expect(result).toBe(1)
  })

  test('getById', async () => {
    const result = await servicosDao.getById(insertId)
    expect(result).toEqual({
      id: insertId,
      nome: 'Aluguel de carro',
      descricao: 'Alugue carros para viajar com sua família',
      deletado: 0,
    })
  })

  test('deleteOne', async () => {
    const result = await servicosDao.deleteOne(insertId)
    expect(result).toBe(1)
  })

  test('getById deleted', async () => {
    const result = await servicosDao.getById(insertId)
    expect(result).toEqual({
      id: insertId,
      nome: 'Aluguel de carro',
      descricao: 'Alugue carros para viajar com sua família',
      deletado: 1,
    })
  })
})
