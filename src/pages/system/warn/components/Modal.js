import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, InputNumber } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal } from 'components'
import { EVENT_TYPES } from 'utils/constant'

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

  renderEmail() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const data = [{ value: '每日', label: '每日' }, { value: '每周', label: '每周' }, { value: '每月', label: '每月' }]

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`SMTP服务器`} {...formItemLayout}>
            {getFieldDecorator('fwq', {
              initialValue: item.fwq,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入SMTP服务器地址，例如：smtp.example.com`} />)}
          </FormItem>
          <FormItem label={i18n.t`SMTP端口`} {...formItemLayout}>
            {getFieldDecorator('port', {
              initialValue: item.port,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入0~65535之间的整数`} />)}
          </FormItem>
          <FormItem label={i18n.t`发件方邮件账号`} {...formItemLayout}>
            {getFieldDecorator('username', {
              initialValue: item.username,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入邮箱，例如：example@163.com`} />)}
          </FormItem>
          <FormItem label={i18n.t`发件方邮件密码`} {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入发件方邮件密码`} />)}
          </FormItem>
          <FormItem label={i18n.t`收件方邮件账号`} {...formItemLayout}>
            {getFieldDecorator('username2', {
              initialValue: item.username2,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入收件方邮件账号`} />)}
          </FormItem>
          <FormItem label={i18n.t`邮件标题`} {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: item.title,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入邮件标题`} />)}
          </FormItem>
          <FormItem label={i18n.t`告警频率`} {...formItemLayout}>
            {getFieldDecorator('number', {
              initialValue: item.number,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Radio.Group options={data} />)}
          </FormItem>
          <FormItem label={i18n.t`事件数量`} {...formItemLayout}>
            {getFieldDecorator('count', {
              initialValue: item.count,
              rules: [
                {
                  required: true,
                },
              ],
            })(<InputNumber style={{ width: '100%' }} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  renderEdit() {
    const { item = {}, onOk, onMailSetting, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const levels = [{ value: '高危', label: '高危' }, { value: '中危', label: '中危' }, { value: '低危', label: '低危' }]
    const notices = [{ value: '邮件', label: '邮件' }]

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`风险等级`} {...formItemLayout}>
            {getFieldDecorator('level', {
              initialValue: item.level,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Radio.Group options={levels} />)}
          </FormItem>
          <FormItem label={i18n.t`事件类型`} {...formItemLayout}>
            {getFieldDecorator('event', {
              initialValue: item.event,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Radio.Group options={EVENT_TYPES} />)}
          </FormItem>
          <FormItem label={i18n.t`通知类型`} {...formItemLayout}>
            <div>
              {getFieldDecorator('notice', {
                initialValue: item.notice,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Radio.Group options={notices} />)}
              <a style={{ color: '#71bfb4' }} onClick={onMailSetting}>（发送邮件配置）</a>
            </div>
          </FormItem>
        </Form>
      </Modal>
    )
  }

  render() {
    const { type } = this.props
    const view = type === 'email' ? this.renderEmail() : this.renderEdit()

    return (
      <React.Fragment>{view}</React.Fragment>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
