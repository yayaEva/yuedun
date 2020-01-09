/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Input, DatePicker, Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import styles from './Chart.less'
import Completed from './Completed'

const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 24,
  md: {
    span: 16,
    offset: 4,
  },
  xl: {
    span: 14,
    offset: 5,
  },
}

const completed = [{
  'name': '29 12:07',
  '漏洞利用': 38600,
  'DDOS攻击': 47100
}, {
  'name': '29 12:07',
  '漏洞利用': 45600,
  'DDOS攻击': 25700
}, {
  'name': '29 12:07',
  '漏洞利用': 36600,
  'DDOS攻击': 47800
}, {
  'name': '29 12:07',
  '漏洞利用': 36900,
  'DDOS攻击': 18600
}, {
  'name': '29 12:07',
  '漏洞利用': 44000,
  'DDOS攻击': 38600
}, {
  'name': '29 12:07',
  '漏洞利用': 39100,
  'DDOS攻击': 49600,
}, {
  'name': '29 12:07',
  '漏洞利用': 41100,
  'DDOS攻击': 37600,
}]

// const completed = {
//   xAxis: {
//     data: ['29 12:07', '29 12:07', '29 12:07', '29 12:07', '29 12:07', '29 12:07', '29 12:07'],
//   },
//   series: [{
//     name: '漏洞利用',
//     data: [39600, 12600, 34600, 40900, 34000, 31100, 31100],
//   }, {
//     name: 'DDOS攻击',
//     data: [27100, 13700, 29800, 13600, 34600, 27600, 27600],
//   }]
// }

// const create_day = {
//   color: ['#acb4c3', '#71bfb4'],
//   tooltip: {
//     trigger: 'axis',
//   },
//   legend: {
//     top: 10,
//   },
//   xAxis: {
//     boundaryGap: false,
//     axisLabel: {
//       rotate: -45,
//     },
//     data: ['1 12:07', '2 12:07', '3 12:07', '4 12:07', '5 12:07', '6 12:07', '7 12:07'],
//   },
//   yAxis: {
//     axisTick: {
//       show: false
//     },
//     splitLine: {
//       show: false
//     },
//   },
//   series: [{
//     name: '严重',
//     type: 'line',
//     smooth: true,
//     data: [12000, 13000, 12000, 14000, 15000, 20000, 18000],
//   }, {
//     name: '高',
//     type: 'line',
//     smooth: true,
//     data: [48000, 43000, 42000, 34000, 35000, 30000, 32000],
//   }],
// }

// const data = [{ value: 70, name: '远程控制' }, { value: 15, name: '僵尸网络' }, { value: 10, name: '网站后门' }, { value: 5, name: '网页篡改' }]
// const threat_type = {
//   legend: {
//     textStyle: {
//       fontSize: 11,
//     },
//     selectedMode: false,
//     orient: 'horizontal',
//     bottom: 30,
//     itemWidth: 12,
//     itemHeight: 12,
//     data: data.map((v) => ({ ...v, icon: 'circle' })),
//   },
//   tooltip: {
//     trigger: 'item',
//     formatter: "{b} : {d}%",
//   },
//   series: [{
//     name: '威胁事件类型',
//     type: 'pie',
//     radius: ['40%', '60%'],
//     center: ['50%', '45%'],
//     avoidLabelOverlap: false,
//     label: {
//       normal: {
//         show: false,
//         position: 'center',
//       },
//       emphasis: {
//         show: true,
//         textStyle: {
//           fontSize: '24',
//           fontWeight: 'bold',
//         },
//       },
//     },
//     data: data,
//   }],
//   color: ['#71bfb4', '#7c97c5', '#ffc297', '#96e386'],
// }

/**
 * 构造威胁类型的数据结构
 * @param {Array} data
 */
function getOptions(data = []) {
  return {
    legend: {
      textStyle: {
        fontSize: 11,
      },
      selectedMode: false,
      orient: 'horizontal',
      bottom: 30,
      itemWidth: 12,
      itemHeight: 12,
      data: data.map((v) => ({ ...v, icon: 'circle' })),
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {d}%",
    },
    series: [{
      name: '威胁事件类型',
      type: 'pie',
      radius: ['40%', '60%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center',
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '24',
            fontWeight: 'bold',
          },
        },
      },
      data,
    }],
    color: ['#71bfb4', '#7c97c5', '#ffc297', '#96e386'],
  }
}

function getCheckedValues(newVal, oldVal = []) {
  let checkedValues = [...oldVal]
  checkedValues = checkedValues.indexOf(newVal) !== -1 ? checkedValues.filter((n) => n !== newVal) : [...checkedValues, newVal]
  return checkedValues
}

@withI18n()
@Form.create()
class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inactive: [],
      threat_type: getOptions(props.data.threat_type),
    }
  }

  handleFields = fields => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  componentDidMount() {
    this.instance = this.refs['threat_type']['getEchartsInstance']()
    this.index = 0

    this.instance.setOption(this.state.threat_type)

    this.timeout = setTimeout(() => {
      // allways set highlight
      this.instance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.index,
      })
    }, 1000)

    this.instance.on('mouseover', (e) => {
      if (e.dataIndex !== this.index) {
        this.instance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.index,
        })
      }
    })

    this.instance.on('mouseout', (e) => {
      this.index = e.dataIndex
      this.instance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      })
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (state.threat_type !== props.data.threat_type) {
      return {
        threat_type: getOptions(props.data.threat_type),
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    this.timeout = setTimeout(() => {
      // allways set highlight
      this.instance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.index,
      })
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  onClick = (e) => {
    const inactive = getCheckedValues(e.dataKey, this.state.inactive)
    this.setState({ inactive })
  }

  render() {
    const { data, form, i18n } = this.props
    const { getFieldDecorator } = form
    const bodyStyle = {
      padding: 0,
    }
    const titleStyle = {
      fontSize: 20,
      color: '#4d4d4d',
      fontWeight: 'normal',
    }

    return (
      <Row gutter={24} style={{ marginBottom: 30 }}>
        <Col lg={16} md={14}>
          <Card bodyStyle={bodyStyle} title={<div style={titleStyle}>{i18n.t`安全趋势`} <RangePicker className={styles.date} allowClear format="YYYY-MM-DD" onChange={this.handleChange.bind(this, 'createTime')} /></div>}>
            {/*<ReactEcharts ref="create_day" option={create_day} />*/}
            <Completed data={completed} onClick={this.onClick} inactive={this.state.inactive} />
          </Card>
        </Col>
        <Col lg={8} md={10}>
          <Card bodyStyle={bodyStyle} title={<div style={titleStyle}>{i18n.t`威胁类型`}</div>}>
            <ReactEcharts ref="threat_type" option={this.state.threat_type} />
          </Card>
        </Col>
      </Row>
    )
  }
}

Filter.propTypes = {
  form: PropTypes.object,
  data: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
