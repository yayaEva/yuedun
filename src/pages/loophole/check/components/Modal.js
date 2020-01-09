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
          <FormItem label={i18n.t`名称`} {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`描述`} {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
            })(<Input.TextArea rows={3} />)}
          </FormItem>
          <FormItem label={i18n.t`目标`} {...formItemLayout}>
            {getFieldDecorator('target', {
              initialValue: item.target,
            })(<Input.TextArea rows={5} placeholder={i18n.t`例：192.168.1.1-192.168.1.5，192.168.2.0/24，test.com`} />)}
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
