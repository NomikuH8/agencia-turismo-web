import { Database } from 'better-sqlite3'
import { ClientesDAO } from './clientes'
import getDB from '../../utils/getDB'

describe('Run Clientes DAO', () => {
  let db: Database
  let clientesDao: ClientesDAO
  let insert: number | bigint
  let insert2: number | bigint

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
    insert = await clientesDao.insertOne({
      nome: 'cleiton rasta',
      email: 'cleiton.rasta@gmail.com',
    })
    expect(insert).toBe(1)

    insert2 = await clientesDao.insertOne({
      nome: 'nilton silva',
      email: 'nilton.silva@gmail.com',
    })
    expect(insert2).toBe(2)
  })

  test('updateOne', async () => {
    const changes = await clientesDao.updateOne({
      id: Number(insert),
      nome: 'borges',
      email: 'borges@gmail.com',
    })
    expect(changes).toBe(1)
  })

  test('getOne', async () => {
    const gotOne = await clientesDao.getOne(Number(insert))
    expect(gotOne).toEqual({
      id: Number(insert),
      nome: 'borges',
      email: 'borges@gmail.com',
      deletado: 0,
    })
  })

  test('getIdsWithDeleted', async () => {
    const gotAll = await clientesDao.getIdsWithDeleted([1, 2])
    expect(gotAll).toEqual([
      {
        id: Number(insert),
        nome: 'borges',
        email: 'borges@gmail.com',
        deletado: 0,
      },
      {
        id: Number(insert2),
        nome: 'nilton silva',
        email: 'nilton.silva@gmail.com',
        deletado: 0,
      },
    ])
  })

  test('deleteOne', async () => {
    const deleted = await clientesDao.deleteOne(Number(insert))
    expect(deleted).toBe(1)
  })

  test('getAllWithDeleted', async () => {
    const gotAllDeleted = await clientesDao.getAllWithDeleted()
    expect(gotAllDeleted).toEqual([
      {
        id: Number(insert),
        nome: 'borges',
        email: 'borges@gmail.com',
        deletado: 1,
      },
      {
        id: Number(insert2),
        nome: 'nilton silva',
        email: 'nilton.silva@gmail.com',
        deletado: 0,
      },
    ])
  })

  test('getOneWithDeleted', async () => {
    const gotOneDeleted = await clientesDao.getOneWithDeleted(Number(insert))
    expect(gotOneDeleted).toEqual({
      id: Number(insert),
      nome: 'borges',
      email: 'borges@gmail.com',
      deletado: 1,
    })
  })
})
