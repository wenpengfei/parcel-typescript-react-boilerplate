import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import { observer, inject } from 'mobx-react'
import { FormComponentProps } from 'antd/lib/form'

import { UserStore } from 'stores'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
}

const formButtonLayout = {
  wrapperCol: { offset: 2 },
}

const rules = {
  userName: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写用户密码' }],
}

interface IMemberForm {
  isEdit?: boolean,
  userStore?: UserStore,
  onSubmitSuccess?: () => any,
  onSubmitFailure?: (error: any) => any,
  initialValue?: any,
}

@inject('userStore')
@observer
class MemberForm extends React.Component<IMemberForm & FormComponentProps, any> {
  static defaultProps = {
    isEdit: false,
  }

  state = {
    submiting: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onSubmitSuccess, onSubmitFailure, isEdit, initialValue } = this.props
        this.setState({ submiting: true }, async() => {
          try {
            await (isEdit ? this.props.userStore.edit(initialValue._id, values) : this.props.userStore.add(values))
            this.setState({ submiting: false }, () => {
              message.success(`${isEdit ? '修改' : '新增'}成功`)
              onSubmitSuccess && onSubmitSuccess()
            })
          } catch (error) {
            this.setState({ submiting: false }, () => {
              onSubmitFailure && onSubmitFailure(error)
            })
          }
        })
      }
    })
  }

  handleResetClick = () => {
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { userName = '', password = '', avatar = '', role = '' } = this.props.initialValue || {}
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户名" hasFeedback>
          {getFieldDecorator('userName', { rules: rules.userName, initialValue: userName })(
            <Input placeholder="用户名" />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="密码" hasFeedback>
          {getFieldDecorator('password', { rules: rules.password, initialValue: password })(
            <Input placeholder="密码" />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="头像" hasFeedback>
          {getFieldDecorator('avatar', { initialValue: avatar })(
            <Input placeholder="头像" />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="权限" hasFeedback>
          {getFieldDecorator('role', { initialValue: role })(
            <Input placeholder="权限" />,
          )}
        </FormItem>
        <FormItem {...formButtonLayout}>
          <Button loading={this.state.submiting} type="primary" htmlType="submit">提交</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleResetClick} >重置</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedMemberForm = Form.create()(MemberForm)

export default WrappedMemberForm
