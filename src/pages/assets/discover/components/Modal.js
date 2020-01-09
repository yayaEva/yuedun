import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal } from 'components'
import { Row, Col } from 'antd'

@withI18n()
class UserModal extends PureComponent {
  render() {
    const { item = {}, onOk, i18n, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={onOk}>
        <Row gutter={40}>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">资产名称</Col>
          <Col style={{ marginBottom: 10 }} span={14}>中国周边经济研究</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">域名个数</Col>
          <Col style={{ marginBottom: 10 }} span={14}>1</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">IP</Col>
          <Col style={{ marginBottom: 10 }} span={14}>202.120.223.182</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">域名</Col>
          <Col style={{ marginBottom: 10 }} span={14}>icne.usst.edu.cn</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">物理位置</Col>
          <Col style={{ marginBottom: 10 }} span={14}>中国上海教育网</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">发现时间</Col>
          <Col style={{ marginBottom: 10 }} span={14}>2018.12.27</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">资产组</Col>
          <Col style={{ marginBottom: 10 }} span={14}>默认资产组</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">网站分类</Col>
          <Col style={{ marginBottom: 10 }} span={14}>已确定</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">是否已治理</Col>
          <Col style={{ marginBottom: 10 }} span={14}>已加入治理</Col>
          <Col style={{ marginBottom: 10 }} span={10} className="text-right">外网</Col>
          <Col style={{ marginBottom: 10 }} span={14}>已开通</Col>
        </Row>
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
