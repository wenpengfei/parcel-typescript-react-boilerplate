import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router'
import { ContentContainer } from 'components'
import { MemberStore } from 'stores'
import MemberListTable from './table'

interface IMemberList {
  memberStore?: MemberStore,
  history: any,
}

@withRouter
@inject('memberStore')
@observer
class MemberList extends React.Component<IMemberList, any> {

  handleEdit = (row) => {
    this.props.memberStore.initializeForm(row)
    this.props.history.push(`/member/${row._id}`)
  }

  render() {
    return (
      <ContentContainer>
        <MemberListTable onEdit={this.handleEdit}/>
      </ContentContainer>)
  }
}

export default MemberList
