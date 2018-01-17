import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import { observer, inject } from 'mobx-react'
import { FormComponentProps } from 'antd/lib/form'

import { MemberStore } from 'stores'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
}

const formButtonLayout = {
  wrapperCol: { offset: 2 },
}

const rules = {
  memberName: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写用户密码' }],
}

interface IMemberForm {
  isEdit?: boolean,
  memberStore?: MemberStore,
  onSubmitSuccess?: () => any,
  onSubmitFailure?: (error: any) => any,
  initialValue?: any,
}

@inject('memberStore')
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
            await (isEdit ? this.props.memberStore.edit(initialValue._id, values) : this.props.memberStore.add(values))
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
    const { memberName = '', password = '', avatar = '', phoneNumber = '' } = this.props.initialValue || {}
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户名" hasFeedback>
          {getFieldDecorator('memberName', { rules: rules.memberName, initialValue: memberName })(
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
        <FormItem {...formItemLayout} label="手机号" hasFeedback>
          {getFieldDecorator('phoneNumber', { initialValue: phoneNumber })(
            <Input placeholder="手机号" />,
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
