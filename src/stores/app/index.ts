import { observable, action } from 'mobx'

export default class AppStore {

  @observable pageLoading = false
  @observable currentUser = {}
  @observable token = ''

  @action toggleLoading(loading: boolean) {
    this.pageLoading = loading || !this.pageLoading
  }
}
