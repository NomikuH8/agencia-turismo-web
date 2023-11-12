import Database from 'better-sqlite3'
import { paths } from '../config/paths'
import { resolve } from 'path'

export default async function getDB() {
  const db = new Database(resolve(paths.db, 'database.db'))
  return db
}
