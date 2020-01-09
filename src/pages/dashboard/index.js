import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Card, Row, Col } from 'antd'
import { Page, Operation } from 'components'
import CardList from './components/CardList'
import List from './components/List'
import NumberCard from './components/NumberCard'
import Chart from './components/Chart'
import Modal from './components/Modal'

// 测试数据
// const numbers = [{
//   number: 123456,
//   title: '威胁事件总数',
//   color: '#1c84c6',
//   icon: '/icons/primary.svg',
// }, {
//   number: 520,
//   title: '高危事件总数',
//   color: '#ed5565',
//   icon: '/icons/error.svg',
// }, {
//   number: 1314,
//   title: '中危事件总数',
//   color: '#f5be5b',
//   icon: '/icons/warning.svg',
// }, {
//   number: 12050,
//   title: '低危事件总数',
//   color: '#1ab394',
//   icon: '/icons/success.svg',
// }]

// 映射 Map
const numberCardsMap = {
  '0': {
    title: '威胁事件总数',
    color: '#1c84c6',
    icon: '/icons/primary.svg',
  },
  '1': {
    title: '低危事件总数',
    color: '#1ab394',
    icon: '/icons/success.svg',
  },
  '2': {
    title: '中危事件总数',
    color: '#f5be5b',
    icon: '/icons/warning.svg',
  },
  '3': {
    title: '高危事件总数',
    color: '#ed5565',
    icon: '/icons/error.svg',
  },
}

/**
 * 数组求和
 */
function sum(arr = []) {
  return arr.reduce((acc, name) => (acc + parseInt(name.num)), 0)
}

@connect(({ app, dashboard, loading }) => ({
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  get cardListProps() {
    const { dispatch, dashboard, loading } = this.props
    const sourceSum = sum(dashboard.srcipEvent.list)
    const source = dashboard.srcipEvent.list.map((v) => ({
      title: v.srcip,
      value: String(v.num),
      percent: v.num / sourceSum * 100, // 计算比例，乘以 100
    }))
    const target = dashboard.dstipEvent.list.map((v) => ({
      title: v.dstip,
      value: String(v.num),
      percent: v.num / sourceSum * 100, // 计算比例，乘以 100
    }))

    return {
      source,
      target,
      loading: loading.effects['dashboard/srcipEvent'] || loading.effects['dashboard/dstipEvent'],
    }
  }

  get listProps() {
    const { dispatch, dashboard, loading } = this.props
    const { list = [] } = dashboard.listEvent

    return {
      dataSource: list,
      loading: loading.effects['dashboard/listEvent'],
      onDeleteItem: id => {},
      onEditItem(item) {},
      onViewItem(item) {
        dispatch({
          type: 'dashboard/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
    }
  }

  get chartProps() {
    const { dispatch, dashboard, loading } = this.props
    const { list = [] } = dashboard.typeEvent
    const threat_type = list.map((v) => ({ value: v.num, name: v.eventtype }))

    return {
      data: {
        threat_type, // 威胁类型
      },
      onFilterChange: value => {
        console.log('onFilterChange', value)
      },
    }
  }

  get modalProps() {
    const { dispatch, dashboard, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = dashboard

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`dashboard/${modalType}`],
      title: '详细信息',
      onOk: data => {
        dispatch({
          type: 'dashboard/hideModal',
        })
      },
      showCancel: false,
      width: '78%',
    }
  }

  get numberCardsProps() {
    const { dispatch, dashboard, loading } = this.props
    const { list = [] } = dashboard.totalEvent

    const counts = sum(list)
    const numbers = [{ level: 0, num: counts }, ...list].map((v) => ({ ...numberCardsMap[v.level], number: v.num }))

    return {
      numbers,
    }
  }

  render() {
    const bodyStyle = {
      padding: 0,
    }
    const titleStyle = {
      fontSize: 20,
      color: '#4d4d4d',
      fontWeight: 'normal',
    }
    const { numbers } = this.numberCardsProps
    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={6} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

    return (
      <Page inner>
        <Row gutter={24}>{numberCards}</Row>
        <Chart {...this.chartProps} />
        <CardList {...this.cardListProps} />
        <Card bodyStyle={bodyStyle} title={<div style={titleStyle}>最新事件<Operation data={['filter']} wrapStyle={{ float: 'right' }} /></div>}>
          <List {...this.listProps} />
        </Card>
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Dashboard
