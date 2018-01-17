import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router'
import { ContentContainer } from 'components'
import { UserStore } from 'stores'
import UserListTable from './table'

interface IUserList {
  userStore?: UserStore,
  history: any,
}

@withRouter
@inject('userStore')
@observer
class UserList extends React.Component<IUserList, any> {

  handleEdit = (row) => {
    this.props.userStore.initializeForm(row)
    this.props.history.push(`/user/${row._id}`)
  }

  render() {
    return (
      <ContentContainer>
        <UserListTable onEdit={this.handleEdit}/>
      </ContentContainer>)
  }
}

export default UserList
