import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const srcPath = resolve(__dirname, '..')
const configPath = resolve(srcPath, 'config')

function main(): void {
  const portsExamplePath = resolve(configPath, 'ports.example.ts')
  const portsPath = resolve(configPath, 'ports.ts')
  if (!existsSync(portsPath)) {
    copyFileSync(portsExamplePath, portsPath)
  }
}

main()
