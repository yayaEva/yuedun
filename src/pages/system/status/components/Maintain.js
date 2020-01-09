/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Input } from 'antd'
import styles from '../index.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 12,
    offset: 6,
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
        <FormItem label={i18n.t`时间同步`} {...formItemLayout}>
          <div>2019-08-23 16：09:00</div>
          <div>时间服务器</div>
          <div><Input defaultValue={'cn.ntp.org.cn'} /></div>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" className="margin-right" onClick={() => onAdd('1')}>
              <Trans>同步服务器时间</Trans>
            </Button>
            <Button type="primary" onClick={() => onAdd('2')}>
              <Trans>同步本机时间</Trans>
            </Button>
          </div>
        </FormItem>
        <FormItem label={i18n.t`更新管理`} {...formItemLayout}>
          <div>软件版本：4.0.2</div>
          <div>分析引擎：5.0.55</div>
          <div>规则库：3.8.0-3.8.0</div>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" className="margin-right" onClick={() => onAdd('3')}>
              <Trans>启用自动更新</Trans>
            </Button>
            <Button className="margin-right" onClick={() => onAdd('4')}>
              <Trans>停止自动更新</Trans>
            </Button>
            <Button type="primary" onClick={() => onAdd('5')}>
              <Trans>立即升级</Trans>
            </Button>
          </div>
        </FormItem>
        <FormItem label={i18n.t`启停控制`} {...formItemLayout}>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" className="margin-right" onClick={() => onAdd('6')}>
              <Trans>重启设备</Trans>
            </Button>
            <Button type="danger" onClick={() => onAdd('7')}>
              <Trans>关机</Trans>
            </Button>
          </div>
        </FormItem>
      </Form>
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: 20 }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onAdd: PropTypes.func,
}

export default Filter
