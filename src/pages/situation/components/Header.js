import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { Row, Col, Icon } from 'antd'
import { AsyncSelect } from 'components'
import { addLangPrefix } from 'utils'
import { getDayRange } from 'utils/getDay'
import { Trans, withI18n } from '@lingui/react'
import styles from './Header.less'

const MAP_DATA = [{
  label: '世界',
  value: 'world',
}, {
  label: '中国',
  value: 'china',
}]

@withI18n()
class Header extends PureComponent {
  render() {
    const { time, mapType, title, onChange } = this.props
    const TIME_DATA = getDayRange().map((v) => ({ ...v, label: v.value, value: v.id }))
    const start_time = TIME_DATA[0].id
    return (
      <div className={styles.header}>
        <Row>
          <Col xl={8} lg={8} md={8}>
            <div className={styles.home}>
              <Link to={addLangPrefix('/dashboard')}><Icon type="home" style={{ color: '#00ffff', fontSize: 18 }} /></Link>
              <span className={styles.select}>当前区域<AsyncSelect allowClear={false} showSearch={false} value={mapType} defaultOptions={MAP_DATA} width={'22%'} onChange={onChange.bind(this, 'map')} /></span>
              <span className={styles.select}>时间<AsyncSelect allowClear={false} showSearch={false} defaultValue={start_time} defaultOptions={TIME_DATA} width={'22%'} onChange={onChange.bind(this, 'time')} /></span>
            </div>
          </Col>
          <Col xl={8} lg={8} md={8}>
            <div className={styles.title}>{title}</div>
          </Col>
          <Col xl={8} lg={8} md={8}>
            <div className={styles.time}><Icon type="clock-circle" /> {time}</div>
          </Col>
        </Row>
      </div>
    )
  }
}

Header.defaultProps = {
  title: '岳盾—网络安全动态感知平台',
  time: '',
  onChange() {},
}

Header.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  onChange: PropTypes.func,
}

export default Header
