import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ClienteType } from 'shared'
import getServerUrl from '../getServerUrl'

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  serverUrl: string = getServerUrl()

  constructor(private http: HttpClient) {}

  getClientes() {
    return this.http.get(`${this.serverUrl}/api/v1/clientes`)
  }

  getClienteById(id: string | number) {
    return this.http.get(`${this.serverUrl}/api/v1/clientes/${id}`)
  }

  postCliente(cliente: ClienteType) {
    return this.http.post(`${this.serverUrl}/api/v1/clientes`, cliente)
  }

  putCliente() {}
}
