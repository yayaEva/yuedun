import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Spin, Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import ReactEcharts from 'echarts-for-react'
import { Progress } from 'components'
import styles from './CardList.less'

const fontSize = document.documentElement.clientWidth > 1280 ? 10 : 7
const histogram = {
  color: ['#71bfb4'],
  tooltip: {
    trigger: 'axis',
    formatter: '{b0}: {c0}K',
    axisPointer: {
      type: 'none',
    },
  },
  grid: {
    left: '10%',
    right: 10,
    bottom: 40,
  },
  xAxis: [{
    type: 'category',
    data: ['管理学院', '图书馆', '光电学院', '门户', '上海理工大学'],
    axisLabel: {
      fontSize,
      color: '#666',
    },
    axisTick: {
      alignWithLabel: true,
      inside: true,
      length: 0,
    },
    axisLine: {
      lineStyle: {
        width: 6,
        color: '#a3a3a3',
      },
    },
    zlevel: 1,
  }],
  yAxis: [{
    type: 'value',
    show: false,
  }],
  series: [{
    name: '最高流量',
    type: 'bar',
    barWidth: 24,
    label: {
      normal: {
        show: true,
        position: 'top',
        fontSize,
        color: '#666',
        formatter: '{c}K',
      },
    },
    data: [90, 180, 200, 300, 600],
  }],
}

// const source = [{
//   title: '10.255.252.251（局域网）',
//   percent: 100,
//   value: '35562',
//   strokeColor: '#ed5565',
// }, {
//   title: '202.120.222.26（上海市.上海理工大学）',
//   percent: 80,
//   value: '31121',
//   strokeColor: '#f5be5b',
// }, {
//   title: '202.120.222.26（上海市.上海理工大学）',
//   percent: 60,
//   value: '21066',
//   strokeColor: '#1c84c6',
// }, {
//   title: '10.255.252.251（局域网）',
//   percent: 40,
//   value: '10269',
//   strokeColor: '#71bfb4',
// }, {
//   title: '10.255.252.251（局域网）',
//   percent: 20,
//   value: '4006',
//   strokeColor: '#71bfb4',
// }]

@withI18n()
class CardList extends PureComponent {
  render() {
    const { source = [], target = [] } = this.props

    return (
      <Spin spinning={this.props.loading}>
        <Row gutter={10}>
          {/* <Col xl={8} md={6} sm={12}>
            <Card style={{ marginBottom: 30 }} bodyStyle={{ padding: 0 }}>
              <div className={styles.title} style={{ position: 'absolute', marginTop: 24, marginLeft: 20, borderWidth: 0 }}>最高流量<span className={styles.text}>TOP5</span></div>
              <ReactEcharts ref="histogram" option={histogram} className={styles.echarts} />
            </Card>
          </Col> */}
          <Col xl={24} md={18} sm={12}>
            <Card style={{ marginBottom: 30 }} bodyStyle={{ padding: '24px 0' }}>
              <div className={styles.wrap}>
                <div className={styles.item}>
                  <div className={styles.title}>事件源地址<span className={styles.text}>TOP5</span></div>
                  <div className={styles.body}>
                    {source.map((v, i) => {
                      return <Progress key={i} {...v} />
                    })}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.title}>事件目标地址<span className={styles.text}>TOP5</span></div>
                  <div className={styles.body}>
                    {target.map((v, i) => {
                      return <Progress key={i} {...v} />
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Spin>
    )
  }
}

CardList.propTypes = {
  location: PropTypes.object,
}

export default CardList
