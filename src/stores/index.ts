import MemberStore from './member'
import UserStore from './user'
import AppStore from './app/index'

class RootStore {
  memberStore: MemberStore
  userStore: UserStore
  appStore: AppStore

  constructor() {
    this.memberStore = new MemberStore()
    this.userStore = new UserStore()
    this.appStore = new AppStore()
  }
}

export default new RootStore()
export { MemberStore, UserStore, AppStore }
