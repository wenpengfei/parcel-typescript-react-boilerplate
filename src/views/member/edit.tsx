import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { MemberStore } from 'stores'
import { ContentContainer } from 'components'
import MemberForm from './form'

interface IMemberEdit {
  memberStore?: MemberStore,
  history: any,
}

@inject('memberStore')
@observer
class MemberEdit extends React.Component<IMemberEdit, any> {
  handleSubmitSuccess = () => {
    this.props.history.push('/member/list')
  }
  render() {
    const { memberStore: { initialFormValue } } = this.props
    return (
      <ContentContainer>
        <MemberForm isEdit={true} initialValue={initialFormValue} onSubmitSuccess={this.handleSubmitSuccess} />
      </ContentContainer>)
  }
}

export default MemberEdit
