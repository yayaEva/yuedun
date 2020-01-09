import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect } from 'components'
import { ROLES } from 'utils/constant'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  handleConfirmPassword = (rule, value, callback) => {
    const { form, i18n } = this.props
    const { getFieldValue } = form
    if (value && value !== getFieldValue('password')) {
      callback(i18n.t`两次输入密码不一致`)
    }
    callback()
  }

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`角色类别`} {...formItemLayout}>
            {getFieldDecorator('role', {
              initialValue: item.role,
              rules: [
                {
                  required: true,
                },
              ],
            })(<AsyncSelect defaultOptions={ROLES} placeholder={i18n.t`请选择角色类别`} width="100%" />)}
          </FormItem>
          <FormItem label={i18n.t`登录账号`} {...formItemLayout}>
            {getFieldDecorator('username', {
              initialValue: item.username,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入登录账号`} />)}
          </FormItem>
          <FormItem label={i18n.t`登录密码`} {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  required: true,
                },
                {
                  min: 8,
                  message: '至少输入8位字符',
                },
                {
                  max: 20,
                  message: '至多输入20位字符',
                },
              ],
            })(<Input allowClear type={'password'} autoComplete='new-password' minLength={8} maxLength={20} placeholder={i18n.t`请输入8-20位密码，由字母、数字、特殊字符组成`} />)}
          </FormItem>
          <FormItem label={i18n.t`确认密码`} {...formItemLayout}>
            {getFieldDecorator('newPassword', {
              initialValue: item.newPassword,
              rules: [
                {
                  required: true,
                },
                {
                  min: 8,
                  message: '至少输入8位字符',
                },
                {
                  max: 20,
                  message: '至多输入20位字符',
                },
                {
                  validator: this.handleConfirmPassword,
                },
              ],
            })(<Input allowClear type={'password'} autoComplete='new-password' minLength={8} maxLength={20} placeholder={i18n.t`请确认密码`} />)}
          </FormItem>
          <FormItem label={i18n.t`姓名`} {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
            })(<Input allowClear placeholder={i18n.t`请输入中文名或英文名`} />)}
          </FormItem>
          <FormItem label={i18n.t`手机号码`} {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: item.phone,
            })(<Input allowClear placeholder={i18n.t`请输入手机号码`} />)}
          </FormItem>
          <FormItem label={i18n.t`邮箱`} {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: item.email,
            })(<Input allowClear placeholder={i18n.t`请输入邮箱地址`} />)}
          </FormItem>
          <FormItem label={i18n.t`可访问起始IP`} {...formItemLayout}>
            {getFieldDecorator('startIp', {
              initialValue: item.startIp,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入IP地址`} />)}
          </FormItem>
          <FormItem label={i18n.t`可访问结束IP`} {...formItemLayout}>
            {getFieldDecorator('endIp', {
              initialValue: item.endIp,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入IP地址`} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
