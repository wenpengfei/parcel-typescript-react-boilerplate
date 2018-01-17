import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import MemberList from './list'
import MemberAdd from './add'
import MemberEdit from './edit'

class Member extends React.Component<any, any> {
  render() {
    const { match: { url: matchedUrl } } = this.props
    return (
      <Switch>
        <Route key="memebr.list" path={`${matchedUrl}/list`} component={MemberList} />
        <Route key="memebr.add" path={`${matchedUrl}/add`} component={MemberAdd} />
        <Route key="memebr.edit" path={`${matchedUrl}/:id`} component={MemberEdit} />
      </Switch>
    )
  }
}

export default Member
