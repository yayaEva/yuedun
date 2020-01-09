import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message, Tabs } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import SysLog from './components/SysLog'
import OptLog from './components/OptLog'
import Safe from './components/Safe'
import Auth from './components/Auth'
import Maintain from './components/Maintain'
import Status from './components/Status'
import Display from './components/Display'
import './index.less'

const { TabPane } = Tabs
const TABS_DATA = [{
  label: '设备状态',
  value: '1',
}, {
  label: '系统日志',
  value: '2',
}, {
  label: '操作日志',
  value: '3',
}, {
  label: '系统授权',
  value: '4',
}, {
  label: '本机维护',
  value: '5',
}, {
  label: '显示设置',
  value: '6',
}, {
  label: '安全设置',
  value: '7',
}]

@withI18n()
@connect(({ systemStatus, loading }) => ({ systemStatus, loading }))
class Index extends PureComponent {
  state = {
    tabs: TABS_DATA,
    activeKey: '1',
  }

  handleRefresh = newQuery => {
    const { systemStatus, dispatch } = this.props
    const { current: page, pageSize } = systemStatus.pagination
    const query = { page, pageSize }

    dispatch({
      type: 'systemStatus/query',
      payload: {
        ...query,
        ...newQuery,
      }
    })
  }

  get listProps() {
    const { dispatch, systemStatus, loading } = this.props
    const { list, pagination } = systemStatus

    return {
      dataSource: list,
      loading: loading.effects['systemStatus/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onSearch: value => {
        this.handleRefresh({
          ...value,
        })
      },
    }
  }

  get filterProps() {
    const { dispatch } = this.props

    return {
      filter: {},
      onAdd: key => {
        console.log('onAdd', key)
      },
    }
  }

  onTabChange = (activeKey) => {
    this.setState({ activeKey }, () => {
      if (activeKey === '2' || activeKey === '3') {
        setTimeout(() => this.handleRefresh({ page: 1, pageSize: 10 }), 250)
      }
    })
  }

  render() {
    const { activeKey, tabs } = this.state

    return (
      <Page inner>
        <Tabs activeKey={activeKey} onChange={this.onTabChange}>
          {tabs.map((v) => <TabPane tab={v.label} key={v.value} />)}
        </Tabs>
        {activeKey === '1' ? <Status {...this.filterProps} /> : null}
        {activeKey === '2' ? <SysLog {...this.listProps} /> : null}
        {activeKey === '3' ? <OptLog {...this.listProps} /> : null}
        {activeKey === '4' ? <Auth {...this.filterProps} /> : null}
        {activeKey === '5' ? <Maintain {...this.filterProps} /> : null}
        {activeKey === '6' ? <Display {...this.filterProps} /> : null}
        {activeKey === '7' ? <Safe {...this.filterProps} /> : null}
      </Page>
    )
  }
}

Index.propTypes = {
  systemStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
