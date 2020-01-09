/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Progress } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form } from 'antd'
import styles from '../index.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    sm: {
      span: 12,
      offset: 6,
    }
  },
}

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  render() {
    const { filter, form, onAdd, i18n } = this.props

    return (
      <Form layout="horizontal" className={styles.form}>
        <FormItem label={i18n.t`服务器状态`} {...formItemLayout}>
          <div>持续运行时间</div>
          <div style={{ paddingLeft: 30 }}>8天21小时54分钟</div>
          <div>授权期限</div>
          <div style={{ paddingLeft: 30 }}>到期时间：2021-10-21，剩余可用810天</div>
          <div>CPU使用</div>
          <div style={{ paddingLeft: 30 }}>
            <div>核心数量8，使用率98%</div>
            <Progress percent={98} showInfo strokeColor={'#ed5565'} />
          </div>
          <div>硬盘状况</div>
          <div style={{ paddingLeft: 30 }}>
            <div>总空间900.341G，已使用64.085G，还剩836.526G</div>
            <Progress percent={2.04} showInfo />
          </div>
          <div>内存状况</div>
          <div style={{ paddingLeft: 30 }}>
            <div>物理内存15.439G，已经使用13.35G，剩余2.089G</div>
            <Progress percent={85.3} showInfo strokeColor={'#f5be5b'} />
          </div>
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
