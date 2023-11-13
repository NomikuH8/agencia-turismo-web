export interface ClientePostBodyType {
  nome: string
  email: string
}

export interface ClientePostReturnType {
  id: number
  nome: string
  email: string
}

export interface ClientePutBodyType {
  id: number
  nome: string
  email: string
}

export interface ClientePutReturnType {
  success: boolean
}

export interface ClienteDeleteReturnType {
  success: boolean
}
