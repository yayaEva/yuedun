/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Input } from 'antd'

const ColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  xl: 8,
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
class Filter extends Component {
  handleFields = fields => {
    // const EXTRA_FIELDS = ['date']

    // EXTRA_FIELDS.forEach((v) => {
    //   if (fields[v]) {
    //     fields['startDate'] = moment(fields[v][0]).format('YYYY-MM-DD')
    //     fields['endDate'] = moment(fields[v][1]).format('YYYY-MM-DD')
    //   }
    //   delete fields[v]
    // })

    return fields
  }

  handleTimeFields = (name, fields) => {
    // const initialTime = []
    // const start = fields['startDate']
    // const end = fields['endDate']

    // if (start) {
    //   initialTime.push(moment(start))
    // }

    // if (end) {
    //   initialTime.push(moment(end))
    // }

    return initialTime
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
    const { onAdd, filter, loadOptions, form, i18n } = this.props
    const { getFieldDecorator } = form

    return (
      <Row gutter={24}>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`name`}>
            {getFieldDecorator('name', { initialValue: filter.name })(
              <Input allowClear maxLength={50} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
            <Row type="flex" justify="space-between">
              <div></div>
              <div>
                <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                  <Trans>Search</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>Reset</Trans>
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
