/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, SearchView, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Input, Radio, Checkbox, DatePicker } from 'antd'
import { EVENT_TYPES, REPORT_TPLS } from 'utils/constant'

const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 24,
  md: {
    span: 16,
    offset: 4,
  },
  xl: {
    span: 14,
    offset: 5,
  },
  style: {
    marginTop: 8,
    marginBottom: 8,
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
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    onFilterChange(fields)
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
    const { onAdd, filter, form, i18n } = this.props
    const { getFieldDecorator } = form
    
    return (
      <Row gutter={24}>
        <div style={{ padding: 4, borderBottom: '1px solid #e6e6e6', fontSize: 20, color: '#4d4d4d' }}>{i18n.t`设置白名单信息（域名或IP)`}</div>
        <Col {...ColProps}>
          <FilterItem>
            {getFieldDecorator('ip', { initialValue: filter.ip })(
              <Input.TextArea rows={6} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
            <Row type="flex" justify="space-between">
              <div></div>
              <div>
                <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                  <Trans>保存</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>重置</Trans>
                </Button>
              </div>
            </Row>
        </Col>
        <Col {...ColProps}>
          <div style={{ background: '#ecf0ea', padding: 10 }}>
            <div><span style={{ fontSize: 20, color: '#1a1a1a' }}>提示</span>（定义免于监测的目标系统的地址）</div>
            <div>域名或IP地址（注：每行只能填写一个域名或IP地址（段），请严格按照如下格式填写：</div>
            <div>1、单站点：WWW.domain.com</div>
            <div>2、多站点：.domain.com</div>
            <div>3、无域名站点：.191.168.1.99</div>
            <div>4、单IP：192.168.1.99</div>
            <div>5、IP段：10.10.10.10-10.10.1.90</div>
          </div>
        </Col>
      </Row>
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { background: 'transparent' },
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
