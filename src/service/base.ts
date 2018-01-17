import { fetch } from 'utils'
import { AxiosInstance } from 'axios'

export default class BaseService {
  endpoint: string
  fetch: AxiosInstance

  constructor(endpoint: string) {
    this.endpoint = endpoint
    this.fetch = fetch
  }

  list = (params?: object): any => fetch.get(this.endpoint, { params })
  add = (body?: object): any => fetch.post(this.endpoint, body)
  update = (id?: string, body?: object): any => fetch.put(`${this.endpoint}/${id}`, body)
  get = (id?: string): any => fetch.get(`${this.endpoint}/${id}`)
  delete = (id?: string): any => fetch.delete(`${this.endpoint}/${id}`)
}
