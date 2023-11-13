import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { createDB } from './createDB'

const rootPath = resolve(__dirname, '..', '..')
const srcPath = resolve(__dirname, '..')
const configPath = resolve(srcPath, 'config')

async function setup(): Promise<void> {
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

  const databasePath = rootPath
  if (!existsSync(databasePath)) {
    mkdirSync(databasePath)
  }

  createDB()
}

setup()
  .then(() => {
    console.log('Setup executado com sucesso')
  })
  .catch((err) => {
    console.log('Algum erro ocorreu no setup')
    console.error(err)
  })
