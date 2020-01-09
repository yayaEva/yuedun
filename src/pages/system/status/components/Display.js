/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Button, AsyncSelect } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, InputNumber, Checkbox } from 'antd'
import { EVENT_TYPES } from 'utils/constant'
import styles from '../index.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 22,
    offset: 1,
  },
}

const DATA = ['3天', '1周', '1个月'].map((v) => ({ label: v, value: v }))

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  handleChange = (key, values) => {
    console.log('handleChange', key, values)
  }

  render() {
    const { filter, form, onAdd, i18n } = this.props

    return (
      <Form layout="horizontal" className={styles.form}>
        <FormItem label={i18n.t`威胁事件总数设置`} {...formItemLayout}>
          <div>显示时间范围 <AsyncSelect allowClear={false} defaultOptions={DATA} defaultValue={DATA[0].value} width={80} onChange={this.handleChange.bind(this, 'time')} /></div>
        </FormItem>
        <FormItem label={i18n.t`威胁类型设置`} {...formItemLayout}>
          <div><Checkbox.Group options={EVENT_TYPES} onChange={this.handleChange.bind(this, 'type')} /></div>
        </FormItem>
        <FormItem label={i18n.t`最新事件设置`} {...formItemLayout}>
          <div>显示数量 <InputNumber min={0} defaultValue={90} onChange={this.handleChange.bind(this, 'new')} /></div>
        </FormItem>
      </Form>
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: '20px 0', minHeight: 520 }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onAdd: PropTypes.func,
}

export default Filter
