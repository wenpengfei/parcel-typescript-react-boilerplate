import { observable, action } from 'mobx'

export default class StoreBase {
  service: any

  @observable state = ''
  @observable list = []
  @observable loading = false
  @observable totalCount = 0
  @observable counter = 0
  @observable pageSize = 10
  @observable pageIndex = 1
  @observable submiting = false
  @observable initialFormValue = {}

  constructor(service) {
    this.service = service
  }

  @action changeSize(pageSize) {
    this.pageSize = pageSize
  }

  @action async getPageList(options: { pageIndex?: number, pageSize?: number }) {
    options.pageIndex = options.pageIndex || this.pageIndex
    options.pageSize = options.pageSize || this.pageSize
    this.pageIndex = options.pageIndex
    this.pageSize = options.pageSize
    this.loading = true
    const result = await this.service.list(options)
    this.loading = false
    this.list = result.data
    this.totalCount = result.totalCount
  }

  @action async add(body) {
    this.submiting = true
    try {
      const result = await this.service.add(body)
      if (result.statusCode && result.statusCode !== 200) {
        throw new Error(result.message)
      }
    } catch (error) {
      throw error
    } finally {
      this.submiting = false
    }
  }

  @action async edit(id, body) {
    this.submiting = true
    try {
      const result = await this.service.update(id, body)
      if (result.statusCode && result.statusCode !== 200) {
        throw new Error(result.message)
      }
    } catch (error) {
      throw error
    } finally {
      this.submiting = false
    }
  }

  @action async remove(id) {
    try {
      await this.service.delete(id)
      this.getPageList({ pageIndex: this.pageIndex })
    } catch (error) {
      throw error
    }
  }

  @action initializeForm(form) {
    this.initialFormValue = form
  }
}
