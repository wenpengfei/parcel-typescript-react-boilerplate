import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Layout } from 'components'
import { auth } from 'utils'
import { AppStore } from './stores'
import { User, Member, NotFound } from './views'
import { withRouter } from 'react-router'

interface Ipage {
  appStore: AppStore,
  history: any,
}

@withRouter
@inject('appStore')
@observer
class Pages extends React.Component<Ipage, any> {
  componentWillMount() {
    const { token } = auth.getLoginCookie()
    if (!token) {
      this.props.history.push('/login')
    }
  }
  render() {
    const { pageLoading } = this.props.appStore
    return (
      <Layout loading={pageLoading}>
        <Switch>
          <Route key="/user" path="/user" component={User} />
          <Route key="/member" path="/member" component={Member} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}

export default Pages
