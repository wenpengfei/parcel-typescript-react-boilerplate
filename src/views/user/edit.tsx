import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { UserStore } from 'stores'
import { ContentContainer } from 'components'
import MemberForm from './form'

interface IUserEdit {
  userStore?: UserStore,
  history: any,
}

@inject('userStore')
@observer
class UserEdit extends React.Component<IUserEdit, any> {
  handleSubmitSuccess = () => {
    this.props.history.push('/user/list')
  }
  render() {
    const { userStore: { initialFormValue } } = this.props
    return (
      <ContentContainer>
        <MemberForm isEdit={true} initialValue={initialFormValue} onSubmitSuccess={this.handleSubmitSuccess} />
      </ContentContainer>)
  }
}

export default UserEdit
