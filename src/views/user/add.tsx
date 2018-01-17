import * as React from 'react'
import { ContentContainer } from 'components'
import MemberForm from './form'

interface IUserAdd {
  history: any,
}

class UserAdd extends React.Component<IUserAdd, any> {
  handleSubmitSuccess = () => {
    this.props.history.push('/user/list')
  }
  render() {
    return (
      <ContentContainer>
        <MemberForm onSubmitSuccess={this.handleSubmitSuccess}/>
      </ContentContainer>)
  }
}

export default UserAdd
