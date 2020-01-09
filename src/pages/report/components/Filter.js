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
  sm: 12,
  md: 12,
  xl: 12,
  style: {
    marginTop: 8,
    marginBottom: 8,
  },
}

const TwoColProps = {
  ...ColProps,
  xm: 24,
  md: 24,
  xl: 24,
}

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  handleFields = fields => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
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

  render() {
    const { onAdd, filter, loadOptions, form, i18n } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const preview = getFieldValue('tpl') !== '2' ? 'preview' : 'custom'

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <Row gutter={24}>
        <Col {...TwoColProps}>
          <FilterItem label={i18n.t`威胁类型`}>
            {getFieldDecorator('level', { initialValue: filter.level })(
              <Checkbox.Group options={EVENT_TYPES} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`选择时间`}>
            {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <RangePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`报告模板`}>
            <div>
              {getFieldDecorator('tpl', { initialValue: filter.tpl || '0' })(
                <Radio.Group options={REPORT_TPLS} />
              )}
              <Button type="primary" className="margin-right" onClick={() => onAdd(preview)}>
                <Trans>预览</Trans>
              </Button>
              <Button onClick={() => onAdd('add')}>
                <Trans>生成</Trans>
              </Button>
            </div>
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`源IP`}>
            {getFieldDecorator('source_ip', { initialValue: filter.source_ip })(
              <Input allowClear placeholder={i18n.t`请输入IP，例如：192.168.1.1`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`目标IP`}>
            {getFieldDecorator('target_ip', { initialValue: filter.target_ip })(
              <Input allowClear placeholder={i18n.t`请输入IP，例如：192.168.1.1`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...TwoColProps}>
            <Row type="flex" justify="space-between">
              <div></div>
              <div>
                <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                  <Trans>查询</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>重置</Trans>
                </Button>
              </div>
            </Row>
        </Col>
      </Row>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
