import BaseService from '../base'

export default class UserService extends BaseService {
  constructor() {
    super('/users')
  }

  login = (userName, password) => this.fetch.post('/users/login', { userName, password })
}
