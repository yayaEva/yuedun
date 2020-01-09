import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect } from 'components'
import { LEVELS, EVENT_TYPES } from 'utils/constant'

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

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`规则名称`} {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear maxLength={20} placeholder={i18n.t`输入少于20个字符（支持数字/字母/中文/下划线/.）`} />)}
          </FormItem>
          <FormItem label={i18n.t`协议类型`} {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: item.type,
              rules: [
                {
                  required: true,
                },
              ],
            })(<AsyncSelect defaultOptions={[]} placeholder={i18n.t`请选择协议类型`} width="100%" />)}
          </FormItem>
          <FormItem label={i18n.t`威胁等级`} {...formItemLayout}>
            {getFieldDecorator('level', {
              initialValue: item.level,
              rules: [
                {
                  required: true,
                },
              ],
            })(<AsyncSelect defaultOptions={LEVELS.slice(1, LEVELS.length)} placeholder={i18n.t`请选择威胁等级`} width="100%" />)}
          </FormItem>
          <FormItem label={i18n.t`源IP`} {...formItemLayout}>
            {getFieldDecorator('source_ip', {
              initialValue: item.source_ip,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`例如：192.168.1.1或者“*”`} />)}
          </FormItem>
          <FormItem label={i18n.t`源端口`} {...formItemLayout}>
            {getFieldDecorator('source_port', {
              initialValue: item.source_port,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入正确的端口号或者“*”`} />)}
          </FormItem>
          <FormItem label={i18n.t`目标IP`} {...formItemLayout}>
            {getFieldDecorator('target_ip', {
              initialValue: item.target_ip,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`例如：192.168.1.1或者“*”`} />)}
          </FormItem>
          <FormItem label={i18n.t`目标端口`} {...formItemLayout}>
            {getFieldDecorator('target_port', {
              initialValue: item.target_port,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入正确的端口号或者“*”`} />)}
          </FormItem>
          <FormItem label={i18n.t`检测内容`} {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: item.content,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear maxLength={200} placeholder={i18n.t`请输入检测内容，最大长度为200字符`} />)}
          </FormItem>
          <FormItem label={i18n.t`事件类型`} {...formItemLayout}>
            {getFieldDecorator('event_type', {
              initialValue: item.event_type,
              rules: [
                {
                  required: true,
                },
              ],
            })(<AsyncSelect defaultOptions={EVENT_TYPES} placeholder={i18n.t`请选择事件类型`} width="100%" />)}
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
