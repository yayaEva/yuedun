import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal } from 'components'
import { Row, Col, Tabs } from 'antd'

const { TabPane } = Tabs
const TABS_DATA = [{
  label: '威胁描述',
  value: '1',
}, {
  label: '威胁影响',
  value: '2',
}, {
  label: '解决方案',
  value: '3',
}]

@withI18n()
class UserModal extends PureComponent {
	state = {
    tabs: TABS_DATA,
    activeKey: '1',
  }

	onTabChange = (activeKey) => {
    this.setState({ activeKey })
  }

  render() {
  	const { activeKey, tabs } = this.state
    const { item = {}, onOk, i18n, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={onOk}>
        <Row gutter={10} style={{ fontSize: 12, marginBottom: 15 }}>
          <Col style={{ marginBottom: 10 }} span={8}>事件名称：Zookeeper未授权访问漏洞</Col>
          <Col style={{ marginBottom: 10 }} span={8}>事件ID：9071073-10.10.40.101...</Col>
          <Col style={{ marginBottom: 10 }} span={8}>数据大小：64字节</Col>
          <Col style={{ marginBottom: 10 }} span={8}>源IP：43.254.0.93（亚太地区未知位置）</Col>
          <Col style={{ marginBottom: 10 }} span={8}>源端口：0</Col>
          <Col style={{ marginBottom: 10 }} span={8}>首次出现：2019-07-26 14：40:47</Col>
          <Col style={{ marginBottom: 10 }} span={8}>目标IP：202.120.217.193（上海市上海理工大学）</Col>
          <Col style={{ marginBottom: 10 }} span={8}>目标端口：0</Col>
          <Col style={{ marginBottom: 10 }} span={8}>最近发生：2019-08-04 12：40:52</Col>
          <Col style={{ marginBottom: 10 }} span={8}>探针IP：10.10.40.101</Col>
          <Col style={{ marginBottom: 10 }} span={8}>威胁地址：</Col>
          <Col style={{ marginBottom: 10 }} span={8}>活动记录：此威胁事件在首次发生后的8天22小时5分钟</Col>
          <Col style={{ marginBottom: 10 }} span={8}>源MAC地址：00:90:0b：56：86：94</Col>
          <Col style={{ marginBottom: 10 }} span={8}>目标MAC地址：14:14：4b:60:01:69</Col>
          <Col style={{ marginBottom: 10 }} span={8}>协议类型：TCP</Col>
        </Row>
        {/*<Tabs activeKey={activeKey} onChange={this.onTabChange}>
          {tabs.map((v) => <TabPane tab={v.label} key={v.value} />)}
        </Tabs>*/}
        <Tabs activeKey={activeKey} onChange={this.onTabChange}>
          <TabPane tab="威胁描述" key="1">
          	<div style={{ padding: '0 32px' }}>威胁描述威胁描述威胁描述威胁描述威胁描述威胁描述威胁描述威胁描述威胁描述</div>
          </TabPane>
          <TabPane tab="威胁影响" key="2">
          	<div style={{ padding: '0 32px' }}>威胁影响威胁影响威胁影响威胁影响威胁影响威胁影响威胁影响威胁影响威胁影响</div>
          </TabPane>
          <TabPane tab="解决方案" key="3">
          	<div style={{ padding: '0 32px' }}>解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案</div>
          </TabPane>
        </Tabs>
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
