/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, SearchView, AsyncSelect, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Input, Icon, DatePicker } from 'antd'
import { LEVELS, EVENT_TYPES } from 'utils/constant'

const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  md: 8,
  xl: 6,
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
  state = {
    expandForm: false,
  }

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

  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  toggleForm = () => {
    const { expandForm } = this.state
    this.setState({
      expandForm: !expandForm,
    })
  }

  renderSimpleForm() {
    const { onAdd, filter, loadOptions, form, i18n } = this.props
    const { getFieldDecorator } = form

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <Row gutter={24}>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`风险等级`}>
            {getFieldDecorator('level', { initialValue: filter.level })(
              <AsyncSelect defaultOptions={LEVELS} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`事件类型`}>
            {getFieldDecorator('type', { initialValue: filter.type })(
              <AsyncSelect defaultOptions={[{ value: '', label: '全部' }, ...EVENT_TYPES]} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`查询时间`}>
            {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <RangePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} onChange={this.handleChange.bind(this, 'createTime')} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
            <Row type="flex" justify="space-between">
              <div></div>
              <div>
                <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                  <Trans>查询</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>重置</Trans>
                </Button>
                <a style={{ marginLeft: 10 }} onClick={this.toggleForm}>
                  展开 <Icon type="down" />
                </a>
              </div>
            </Row>
        </Col>
      </Row>
    )
  }

  renderAdvancedForm() {
    const { onAdd, filter, loadOptions, form, i18n } = this.props
    const { getFieldDecorator } = form

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <Row gutter={24}>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`风险等级`}>
            {getFieldDecorator('level', { initialValue: filter.level })(
              <AsyncSelect defaultOptions={LEVELS} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`事件类型`}>
            {getFieldDecorator('type', { initialValue: filter.type })(
              <AsyncSelect defaultOptions={[{ value: '', label: '全部' }, ...EVENT_TYPES]} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`查询时间`}>
            {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <RangePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} onChange={this.handleChange.bind(this, 'createTime')} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`事件名称`}>
            {getFieldDecorator('event_name', { initialValue: filter.event_name })(
              <Input allowClear placeholder={i18n.t`请输入内容`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`源IP`}>
            {getFieldDecorator('source_ip', { initialValue: filter.source_ip })(
              <Input allowClear placeholder={i18n.t`请输入内容`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`源端口`}>
            {getFieldDecorator('source_port', { initialValue: filter.source_port })(
              <Input allowClear placeholder={i18n.t`请输入内容`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`目标IP`}>
            {getFieldDecorator('target_ip', { initialValue: filter.target_ip })(
              <Input allowClear placeholder={i18n.t`请输入内容`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`目标端口`}>
            {getFieldDecorator('target_port', { initialValue: filter.target_port })(
              <Input allowClear placeholder={i18n.t`请输入内容`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`IP起始段`}>
            {getFieldDecorator('ip_start', { initialValue: filter.ip_start })(
              <Input allowClear placeholder={i18n.t`请输入内容`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`IP结束段`}>
            {getFieldDecorator('ip_end', { initialValue: filter.ip_end })(
              <Input allowClear placeholder={i18n.t`请输入内容`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`威胁地址`}>
            {getFieldDecorator('address', { initialValue: filter.address })(
              <Input allowClear placeholder={i18n.t`请输入内容`} onPressEnter={this.handleSubmit} />
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
                <a style={{ marginLeft: 10 }} onClick={this.toggleForm}>
                  收起 <Icon type="up" />
                </a>
              </div>
            </Row>
        </Col>
      </Row>
    )
  }

  renderForm() {
    const { expandForm } = this.state
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()
  }

  render() {
    return <React.Fragment>{this.renderForm()}</React.Fragment>
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
