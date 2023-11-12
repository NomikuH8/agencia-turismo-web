import { ports } from './config/ports'
import getServer from './utils/getServer'

async function main (): Promise<void> {
  const server = await getServer()
  await server.listen({
    port: ports.http
  })
}

main()
  .then(() => {
    console.log(`Servidor rodando em http://localhost:${ports.http}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
