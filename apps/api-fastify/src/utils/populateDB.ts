import { ClientesDAO } from "../models/clientes/clientes"
import { FornecedoresDAO } from "../models/fornecedores/fornecedores"
import { ServicosDAO } from "../models/servicos/servicos"
import getDB from "./getDB"

async function main() {
  const db = await getDB()
  const clientesDao = new ClientesDAO(db)
  const fornecedoresDao = new FornecedoresDAO(db)
  const servicosDao = new ServicosDAO(db)

  const insertClientes = async () => {
    await clientesDao.insertOne({
      nome: 'Menna',
      email: 'menna@gmail.com'
    })
    await clientesDao.insertOne({
      nome: 'Sophia',
      email: 'fifi@gmail.com'
    })
    await clientesDao.insertOne({
      nome: 'Graziela',
      email: 'grazi@gmail.com'
    })
    await clientesDao.insertOne({
      nome: 'Henrique',
      email: 'henrique@gmail.com'
    })
    await clientesDao.insertOne({
      nome: 'Ricardo',
      email: 'richard@gmail.com'
    })
  }

  let passagensAereasId = 0
  let hospedagemId = 0
  let aluguelCarroId = 0
  const insertServicos = async () => {
    passagensAereasId = await servicosDao.insertOne({
      nome: 'Passagens aéreas',
      descricao: 'Viaje o mundo com sua família!'
    })
    hospedagemId = await servicosDao.insertOne({
      nome: 'Hospedagem 3 dias',
      descricao: 'Estadia para você e sua família!'
    })
    aluguelCarroId = await servicosDao.insertOne({
      nome: 'Aluguel de carro',
      descricao: 'Alugue carros para viajar com sua família!'
    })
  }

  const insertFornecedores = async () => {
    const mercuryId = await fornecedoresDao.insertOne({
      nome: 'Mercury',
      site: 'mercury.com'
    })
    const localizaId = await fornecedoresDao.insertOne({
      nome: 'Localiza',
      site: 'localiza.com.br'
    })
    const milhasId = await fornecedoresDao.insertOne({
      nome: '123milhas',
      site: '123milhas.com.br'
    })
    const decolarId = await fornecedoresDao.insertOne({
      nome: 'Decolar.com',
      site: 'decolar.com'
    })
    const azulId = await fornecedoresDao.insertOne({
      nome: 'Azul',
      site: 'azul.com'
    })

    await fornecedoresDao.associarServico({
      fornecedorId: mercuryId,
      servicoId: aluguelCarroId,
      modalidade_pagamento: '3 vezes no pix',
      valor: 250
    })

    await fornecedoresDao.associarServico({
      fornecedorId: localizaId,
      servicoId: aluguelCarroId,
      modalidade_pagamento: 'À vista',
      valor: 225
    })

    await fornecedoresDao.associarServico({
      fornecedorId: milhasId,
      servicoId: passagensAereasId,
      modalidade_pagamento: 'À vista',
      valor: 225
    })
    await fornecedoresDao.associarServico({
      fornecedorId: milhasId,
      servicoId: hospedagemId,
      modalidade_pagamento: 'À vista',
      valor: 225
    })
    await fornecedoresDao.associarServico({
      fornecedorId: milhasId,
      servicoId: aluguelCarroId,
      modalidade_pagamento: 'À vista',
      valor: 225
    })

    await fornecedoresDao.associarServico({
      fornecedorId: decolarId,
      servicoId: passagensAereasId,
      modalidade_pagamento: 'À vista',
      valor: 225
    })
    await fornecedoresDao.associarServico({
      fornecedorId: decolarId,
      servicoId: hospedagemId,
      modalidade_pagamento: 'À vista',
      valor: 225
    })

    await fornecedoresDao.associarServico({
      fornecedorId: azulId,
      servicoId: passagensAereasId,
      modalidade_pagamento: 'À vista',
      valor: 225
    })
  }

  await insertClientes()
  await insertServicos()
  await insertFornecedores()
}

main()
  .then(() => {
    console.log('Banco populado com sucesso.')
  })
  .catch(() => {
    console.error('Houve um erro enquanto o banco era populado.')
  })