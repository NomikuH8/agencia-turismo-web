import { Database } from 'better-sqlite3'
import { ClientesDAO } from './clientes'
import getDB from '../../utils/getDB'
import { createDB } from '../../utils/createDB'

describe('Run Clientes DAO', () => {
  let db: Database
  let clientesDao: ClientesDAO
  let insertId: number
  let insertId2: number

  beforeAll(async () => {
    createDB()
  })

  beforeEach(async () => {
    db = await getDB()
    clientesDao = new ClientesDAO(db)
  })

  afterEach(() => {
    db.close()
  })

  test('getAll', async () => {
    const resultAll = await clientesDao.getAll()
    expect(resultAll).toEqual([])
    db.close()
  })

  test('insertOne', async () => {
    insertId = await clientesDao.insertOne({
      nome: 'cleiton rasta',
      email: 'cleiton.rasta@gmail.com',
    })
    expect(insertId).toBe(1)

    insertId2 = await clientesDao.insertOne({
      nome: 'nilton silva',
      email: 'nilton.silva@gmail.com',
    })
    expect(insertId2).toBe(2)
  })

  test('updateOne', async () => {
    const changes = await clientesDao.updateOne(insertId, {
      nome: 'borges',
      email: 'borges@gmail.com',
    })
    expect(changes).toBe(1)
  })

  test('getOne', async () => {
    const gotOne = await clientesDao.getOne(insertId)
    expect(gotOne).toEqual({
      id: insertId,
      nome: 'borges',
      email: 'borges@gmail.com',
      deletado: 0,
    })
  })

  test('getIdsWithDeleted', async () => {
    const gotAll = await clientesDao.getIdsWithDeleted([1, 2])
    expect(gotAll).toEqual([
      {
        id: insertId,
        nome: 'borges',
        email: 'borges@gmail.com',
        deletado: 0,
      },
      {
        id: insertId2,
        nome: 'nilton silva',
        email: 'nilton.silva@gmail.com',
        deletado: 0,
      },
    ])
  })

  test('deleteOne', async () => {
    const deleted = await clientesDao.deleteOne(insertId)
    expect(deleted).toBe(1)
  })

  test('getAllWithDeleted', async () => {
    const gotAllDeleted = await clientesDao.getAllWithDeleted()
    expect(gotAllDeleted).toEqual([
      {
        id: insertId,
        nome: 'borges',
        email: 'borges@gmail.com',
        deletado: 1,
      },
      {
        id: insertId2,
        nome: 'nilton silva',
        email: 'nilton.silva@gmail.com',
        deletado: 0,
      },
    ])
  })

  test('getOneWithDeleted', async () => {
    const gotOneDeleted = await clientesDao.getOneWithDeleted(insertId)
    expect(gotOneDeleted).toEqual({
      id: insertId,
      nome: 'borges',
      email: 'borges@gmail.com',
      deletado: 1,
    })
  })
})
