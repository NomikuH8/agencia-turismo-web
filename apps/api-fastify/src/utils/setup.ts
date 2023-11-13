import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { paths } from '../config/paths'
import { createDB } from './createDB'

const srcPath = resolve(__dirname, '..')
const configPath = resolve(srcPath, 'config')

function setup(): void {
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

  createDB()
}

setup()
