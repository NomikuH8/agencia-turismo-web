import { createDB } from './createDB'
import getDB from './getDB'

beforeEach(() => {
  createDB()
})

test('Setup Database', async () => {
  const db = await getDB()
  const result = db.prepare('SELECT * FROM cliente').all()
  expect(result).toEqual([])
})
