/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Button, AsyncSelect } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Switch } from 'antd'
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

const DATA = [60, 90, 120, 180].map((v) => ({ label: v, value: v }))
const COUNT_DATA = [3, 6, 9].map((v) => ({ label: v, value: v }))
const SPACE_DATA = [85, 90, 95].map((v) => ({ label: v, value: v }))

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
        <FormItem label={i18n.t`系统登录安全设置`} {...formItemLayout}>
          <div><AsyncSelect allowClear={false} defaultOptions={DATA} defaultValue={60} width={80} onChange={this.handleChange.bind(this, 'time_in')} /> 秒之内，用户尝试登录的失败次数超过 <AsyncSelect allowClear={false} defaultOptions={COUNT_DATA} defaultValue={3} width={80} onChange={this.handleChange.bind(this, 'count')} /> 次，锁定该用户 <AsyncSelect allowClear={false} defaultOptions={DATA} defaultValue={180} width={80} onChange={this.handleChange.bind(this, 'time_lock')} /> 秒</div>
        </FormItem>
        <FormItem label={i18n.t`超时设置`} {...formItemLayout}>
          <div><AsyncSelect allowClear={false} defaultOptions={DATA} defaultValue={30} width={80} onChange={this.handleChange.bind(this, 'time_out')} /> 分钟之内，用户无任何操作，系统将因超时而自动登出</div>
        </FormItem>
        <FormItem label={i18n.t`事件存储设置`} {...formItemLayout}>
          <div>当使用存储空间超过 <AsyncSelect allowClear={false} defaultOptions={SPACE_DATA} defaultValue={90} width={80} onChange={this.handleChange.bind(this, 'space')} /> %，系统产生告警</div>
        </FormItem>
        <FormItem label={i18n.t`服务器资源设置`} {...formItemLayout}>
          <div>当存储空间即将占满，是否开启循环覆盖：<Switch onChange={this.handleChange.bind(this, 'cover')} /></div>
        </FormItem>
        <FormItem label={i18n.t`证书登录设置`} {...formItemLayout}>
          <div>是否开启证书登录：<Switch onChange={this.handleChange.bind(this, 'certificate')} /></div>
        </FormItem>
      </Form>
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: '20px 0' }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onAdd: PropTypes.func,
}

export default Filter
