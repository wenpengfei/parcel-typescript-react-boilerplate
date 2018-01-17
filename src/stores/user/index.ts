import BaseStore from '../base'
import { UserService } from 'service'
import { action } from 'mobx'
import { auth } from 'utils'

export default class UserStore extends BaseStore {
  constructor() {
    super(new UserService())
  }

  @action async login(options: { userName: string, password: string }) {
    try {
      const result = await this.service.login(options.userName, options.password)
      const { user, token } = result
      auth.setLoginCookie(user._id, token)
    } catch (error) {
      throw error
    }
  }

  @action async logout() {
    auth.removeLoginCookie()
  }
}
