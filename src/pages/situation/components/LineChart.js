import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import { Trans, withI18n } from '@lingui/react'
import styles from './CardList.less'

const create_day = {
  color: ['#ff0000', '#fbb03b', '#fcee21'],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 10,
    textStyle: {
    	fontSize: 10,
    	color: '#c2c6c2',
    },
  },
  grid: {
  	left: 40,
  },
  xAxis: {
    boundaryGap: false,
    axisLabel: {
      rotate: -45,
      fontSize: 10,
      color: '#42dda9',
    },
    data: ['1 12:07', '2 12:07', '3 12:07', '4 12:07', '5 12:07', '6 12:07', '7 12:07'],
  },
  yAxis: {
  	axisLabel: {
  		fontSize: 10,
  		color: '#42dda9',
  	},
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
      	color: ['#222'],
      },
    },
  },
  series: [{
    name: '网络欺诈',
    type: 'line',
    smooth: false,
    data: [12000, 13000, 12000, 14000, 15000, 20000, 18000],
  }, {
    name: '设备安全',
    type: 'line',
    smooth: false,
    data: [48000, 43000, 42000, 34000, 35000, 30000, 32000],
  }, {
    name: '其他威胁',
    type: 'line',
    smooth: false,
    data: [40000, 40000, 45000, 34000, 28000, 36000, 17000],
  }],
}

@withI18n()
class LineChart extends PureComponent {
  render() {
    return (
    	<div className={styles.card} style={{ padding: '0 10px 0 20px' }}>
      	<ReactEcharts ref="create_day" option={create_day} className={styles.echarts} />
      </div>
    )
  }
}

export default LineChart
