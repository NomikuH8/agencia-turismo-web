export interface InsertOneType {
  nome: string
  site: string
}

export interface UpdateOneType {
  nome: string
  site: string
}

export interface InsertAssociateServicoType {
  fornecedorId: number
  servicoId: number
  modalidade_pagamento: string
  valor: number
}

export interface ServicosAssociadosType {
  servico_id: number
  modalidade_pagamento: string
  valor: number
  nome: string
  descricao: string
}

export interface UpdateAssociateServicoType {
  fornecedorId: number
  servicoId: number
  modalidade_pagamento: string
  valor: number
}
