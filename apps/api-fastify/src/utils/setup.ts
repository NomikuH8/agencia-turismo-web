import { copyFileSync, existsSync } from "fs"
import { resolve } from "path"

const rootPath = resolve(__dirname, '..', '..')
const srcPath = resolve(__dirname, '..')
const configPath = resolve(srcPath, 'config')

async function main() {
  const portsExamplePath = resolve(configPath, 'ports.example.ts')
  const portsPath = resolve(configPath, 'ports.ts')
  if (!existsSync(portsPath)) {
    copyFileSync(
      portsExamplePath,
      portsPath
    )
  }
}

main()