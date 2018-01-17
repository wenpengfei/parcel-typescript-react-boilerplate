import * as React from 'react'
import { ContentContainer } from 'components'
import MemberForm from './form'

interface IMemberAdd {
  history: any,
}

class MemberAdd extends React.Component<IMemberAdd, any> {
  handleSubmitSuccess = () => {
    this.props.history.push('/member/list')
  }
  render() {
    return (
      <ContentContainer>
        <MemberForm onSubmitSuccess={this.handleSubmitSuccess}/>
      </ContentContainer>)
  }
}

export default MemberAdd
