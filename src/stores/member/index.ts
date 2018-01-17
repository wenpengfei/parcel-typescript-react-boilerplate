import BaseStore from '../base'
import { MemberService } from 'service'

export default class MemberStore extends BaseStore {
  constructor() {
    super(new MemberService())
  }
}
