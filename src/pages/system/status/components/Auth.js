/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
}

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  handleFields = fields => {
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      let fields = getFieldsValue()
      fields = this.handleFields(fields)
      onFilterChange(fields)
    })
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    const { status } = fields
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue({
      ...fields,
    })
    this.handleSubmit()
  }

  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { filter, form, i18n } = this.props
    const { getFieldDecorator } = form

    return (
      <Form layout="horizontal">
        <FormItem label={i18n.t`设备编号`} {...formItemLayout}>
          <span>{filter.admin_ip || 'AFbURFLaEEZvlpw1'}</span>
        </FormItem>
        <FormItem label={i18n.t`设备序列号`} {...formItemLayout}>
          <span>{filter.gateway || 'owpm1nFV-q8ywBS6P-WBlbqrLn-4u1FwoAe'}</span>
        </FormItem>
        <FormItem label={i18n.t`设备使用到期时间`} {...formItemLayout}>
          <span>{filter.subnet_mask || '2021-10-21'}</span>
        </FormItem>
        <FormItem label={i18n.t`设备当前激活状态`} {...formItemLayout}>
          <span>{filter.dns || '已激活'}</span>
        </FormItem>
        <FormItem label={i18n.t`重新激活请输入激活码`} {...formItemLayout}>
          {getFieldDecorator('mac', {
            initialValue: filter.mac,
          })(
            <Input allowClear onPressEnter={this.handleSubmit} />
          )}
        </FormItem>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
            <Trans>激活</Trans>
          </Button>
          <Button onClick={this.handleReset}>
            <Trans>重置</Trans>
          </Button>
        </div>
      </Form>
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: 20, minHeight: 520 }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
