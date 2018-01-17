import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import UserList from './list'
import UserAdd from './add'
import UserEdit from './edit'

class User extends React.Component<any, any> {
  render() {
    const { match: { url: matchedUrl } } = this.props
    return (
      <Switch>
        <Route key="user.list" path={`${matchedUrl}/list`} component={UserList} />
        <Route key="user.add" path={`${matchedUrl}/add`} component={UserAdd} />
        <Route key="user.edit" path={`${matchedUrl}/:id`} component={UserEdit} />
      </Switch>
    )
  }
}

export default User
