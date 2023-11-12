import { ports } from "../config/ports";

export const openApi = {
  info: {
    title: 'Agencia de Turismo',
    description: 'Informações da API da Agencia de Turismo',
    version: '0.1.0'
  },
  servers: [
    {
      url: 'http://localhost:' + ports.http
    }
  ],
}