import BaseService from '../base'

export default class MemberService extends BaseService {
  constructor() {
    super('/members')
  }
}
