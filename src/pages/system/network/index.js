import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message, Tabs } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'
import './index.less'

const { TabPane } = Tabs

@withI18n()
@connect(({ systemNetwork, loading }) => ({ systemNetwork, loading }))
class Index extends PureComponent {
  state = {
    activeKey: '1',
  }

  handleRefresh = newQuery => {
    const { systemNetwork, dispatch } = this.props
    const { current: page, pageSize } = systemNetwork.pagination
    const query = { page, pageSize }

    dispatch({
      type: 'systemNetwork/query',
      payload: {
        ...query,
        ...newQuery,
      }
    })
  }

  get listProps() {
    const { dispatch, systemNetwork, loading } = this.props
    const { list, pagination } = systemNetwork

    return {
      dataSource: list,
      loading: loading.effects['systemNetwork/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
    }
  }

  get filterProps() {
    const { dispatch } = this.props

    return {
      filter: {},
      onFilterChange: value => {
        console.log('onFilterChange', value)
        dispatch({
          type: 'systemNetwork/save',
          payload: value,
        })
      },
    }
  }

  onTabChange = (activeKey) => {
    this.setState({ activeKey }, () => {
      if (activeKey === '2') {
        setTimeout(() => this.handleRefresh({ page: 1, pageSize: 10 }), 250)
      }
    })
  }

  render() {
    const { activeKey } = this.state

    return (
      <Page inner>
        <Tabs activeKey={activeKey} onChange={this.onTabChange}>
          <TabPane tab="管理口设置" key="1" />
          <TabPane tab="网口状态" key="2" />
          <TabPane tab="双机热备" key="3" />
        </Tabs>
        {activeKey === '1' ? <Filter {...this.filterProps} /> : null}
        {activeKey === '2' ? <List {...this.listProps} /> : null}
      </Page>
    )
  }
}

Index.propTypes = {
  systemNetwork: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
