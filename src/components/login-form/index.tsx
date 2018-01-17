import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { UserStore } from 'stores'

const styles = require('./index.scss')
const FormItem = Form.Item

interface ILogin {
  userStore?: UserStore,
  onSuccess?: () => void,
}

@inject('userStore', 'appStore')
@observer
class Login extends React.Component<ILogin & FormComponentProps, any> {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        try {
          await this.props.userStore.login(values)
          const { onSuccess } = this.props
          onSuccess && onSuccess()
        } catch (error) {
          throw error
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['login-form-container']}>
        <h2>登陆</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="用户密码" />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              登陆
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedLogin = Form.create()(Login)

export default WrappedLogin
