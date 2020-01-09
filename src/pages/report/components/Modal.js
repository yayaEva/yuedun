import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Checkbox, Radio, Row, Col, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { Trans, withI18n } from '@lingui/react'
import { Modal, Progress } from 'components'
import { REPORT_EVENTS, REPORT_EVENTS_MAP } from 'utils/constant'
import styles from '../index.less'

const ButtonGroup = Button.Group
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 18,
    offset: 6,
  },
}

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 22,
    offset: 1,
  },
}

const source = [{
  title: '10.255.252.251（局域网）',
  percent: 100,
  value: '35562',
  strokeColor: '#ed5565',
}, {
  title: '202.120.222.26（上海市.上海理工大学）',
  percent: 80,
  value: '31121',
  strokeColor: '#f5be5b',
}, {
  title: '202.120.222.26（上海市.上海理工大学）',
  percent: 60,
  value: '21066',
  strokeColor: '#1c84c6',
}, {
  title: '10.255.252.251（局域网）',
  percent: 40,
  value: '10269',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}]

const data = [{
  value: 1140,
  name: '远程控制'
}, {
  value: 1210,
  name: '僵尸网络'
}, {
  value: 1000,
  name: '网站后门'
}, {
  value: 1860,
  name: '网页篡改'
}, {
  value: 1000,
  name: '网络欺诈'
}, {
  value: 1479,
  name: '数据泄露'
}, {
  value: 1000,
  name: '设备安全'
}, {
  value: 1440,
  name: '其他威胁'
}, {
  value: 1100,
  name: 'DDOS攻击'
}, {
  value: 1100,
  name: '网络盗号'
}, {
  value: 1143,
  name: '漏洞利用'
}, {
  value: 25185,
  name: '攻击事件'
}]

const threat_type = {
  // legend: {
  //   textStyle: {
  //     fontSize: 11,
  //   },
  //   selectedMode: false,
  //   orient: 'vertical',
  //   x: 'left',
  //   bottom: 30,
  //   itemWidth: 12,
  //   itemHeight: 12,
  //   data: data.map((v) => ({ ...v, icon: 'none' })),
  // },
  tooltip: {
    trigger: 'item',
    formatter: "{b} : {d}%",
  },
  series: [{
    name: '威胁事件类型',
    type: 'pie',
    radius: ['40%', '60%'],
    // center: ['50%', '45%'],
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: true,
        formatter: '{b}: {c} ({d}%)',
        fontSize: 10,
      },
      emphasis: {
        show: true,
        textStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
      },
    },
    data: data,
  }],
  color: ['#de4e4c', '#e5674c', '#f6833a', '#edcd45', '#4aa3e4', '#5ba4d1', '#d1529e', '#4aa3e4', '#5ec270', '#54bac5', '#6773c7', '#8556b7'],
}

const create_day = {
  color: ['#acb4c3', '#71bfb4'],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 10,
  },
  xAxis: {
    boundaryGap: false,
    axisLabel: {
      rotate: -45,
    },
    data: ['1 12:07', '2 12:07', '3 12:07', '4 12:07', '5 12:07', '6 12:07', '7 12:07'],
  },
  yAxis: {
    axisTick: {
      show: false
    },
    splitLine: {
      show: true
    },
  },
  series: [{
    name: '远程控制',
    type: 'line',
    smooth: true,
    data: [48000, 23000, 42000, 48000, 35000, 30000, 32000],
  }],
}

@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, type, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const getStyle = (bgColor) => ({ background: bgColor, color: '#fff', borderColor: bgColor })

    if (type === 'preview') {
      return (
        <Modal {...modalProps} onOk={modalProps.onCancel}>
          <Form layout="horizontal" className={styles.form}>
            <FormItem label={i18n.t`查询时间`} {...layout}>
              <Row>
                <Col span={12}>开始时间：2019-10-20-15:37:46</Col>
                <Col span={12}>结束时间：2019-10-23-15:37:46</Col>
              </Row>
            </FormItem>
            <FormItem label={i18n.t`数据统计`} {...layout}>
              <Row>
                <Col span={6}>
                  <ButtonGroup>
                    <Button style={getStyle('#1c84c6')}>总</Button>
                    <Button>155443</Button>
                  </ButtonGroup>
                </Col>
                <Col span={6}>
                  <ButtonGroup>
                    <Button style={getStyle('#ed5565')}>高</Button>
                    <Button>126</Button>
                  </ButtonGroup>
                </Col>
                <Col span={6}>
                  <ButtonGroup>
                    <Button style={getStyle('#f5be5b')}>中</Button>
                    <Button>10261</Button>
                  </ButtonGroup>
                </Col>
                <Col span={6}>
                  <ButtonGroup>
                    <Button style={getStyle('#1ab394')}>低</Button>
                    <Button>145056</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </FormItem>
            <FormItem label={i18n.t`威胁等级`} {...layout}>
              <div className={styles.level}><Progress percent={60} value={'中危 3'} /></div>
              <div style={{ paddingRight: '0.53125rem' }}>
                <Row>
                  <Col span={8}><div className="text-left" style={{ color: '#1ab394' }}>0~2 低危</div></Col>
                  <Col span={8}><div className="text-center" style={{ color: '#f5be5b' }}>2.1~4 中危</div></Col>
                  <Col span={8}><div className="text-right" style={{ color: '#ed5565' }}>4.1~5 高危</div></Col>
                </Row>
              </div>
            </FormItem>
            <FormItem label={i18n.t`威胁事件类型`} {...layout}>
              <Row type="flex" justify="center" style={{ alignItems: 'center' }}>
                <Col span={9}>
                  <Row>
                    {data.map((v, i) => {
                      return <Col key={i} span={12} style={{ margin: '8px 0' }}>{v.name} {v.value}</Col>
                    })}
                  </Row>
                </Col>
                <Col span={15}>
                  <ReactEcharts ref="threat_type" option={threat_type} style={{ height: 240 }} />
                </Col>
              </Row>
            </FormItem>
            <FormItem label={i18n.t`源地址和事件目标地址TOP10`} {...layout}>
              <Row gutter={20}>
                <Col span={12}>
                  <div>
                    <div className={styles.title}>源地址</div>
                    {source.map((v, i) => {
                      return <Progress key={i} {...v} />
                    })}
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <div className={styles.title}>事件目标地址</div>
                    {source.map((v, i) => {
                      return <Progress key={i} {...v} />
                    })}
                  </div>
                </Col>
              </Row>
            </FormItem>
            <FormItem label={i18n.t`威胁事件趋势图`} {...layout}>
              <ReactEcharts ref="create_day" option={create_day} style={{ height: 240 }} />
            </FormItem>
          </Form>
        </Modal>
      )
    }

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`报告内容`} {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: item.content,
            })(<Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {REPORT_EVENTS.map((v, i) => {
                  return (
                    <Col key={i} span={v.span} style={{ marginBottom: 8 }}>
                      <Checkbox value={v.value}>{v.label}</Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </Checkbox.Group>)}
          </FormItem>
          <FormItem label={i18n.t`威胁事件曲线图`} {...formItemLayout}>
            {getFieldDecorator('map', {
              initialValue: item.map,
            })(<Radio.Group options={REPORT_EVENTS_MAP} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
