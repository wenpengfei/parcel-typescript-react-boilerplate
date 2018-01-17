import * as React from 'react'
import { withRouter } from 'react-router'
import { LoginForm } from 'components'

const styles = require('./index.scss')

interface ILogin {
  form: any,
  history: any,
}

@withRouter
class Login extends React.Component<ILogin, any> {
  handleLoginSuccess = () => {
    this.props.history.push('/user/list')
  }
  render() {
    return (<div className={styles.container}>
      <LoginForm onSuccess={this.handleLoginSuccess}/>
    </div>)
  }
}

export default Login
