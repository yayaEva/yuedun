import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { CircleProgress } from 'components'
import styles from './CardList.less'

class RadialChart extends PureComponent {
  render() {
    const { data = [], color = [] } = this.props
    const marks = data.map((v, i) => (
      <Col sm={12} key={i}>
        <div className={styles.icon} style={{ backgroundColor: color[i] }}></div>
        <div className={styles.label}>{v.name}</div>
      </Col>
    ))

    return (
      <div className={styles.card} style={{ padding: '0 10px' }}>
        <div className={styles.echarts} style={{ marginLeft: -16 }}><CircleProgress className={styles.echarts} {...this.props} /></div>
        {marks.length > 0 && <div className={styles.marks}>
          <Row>
            {marks}
          </Row>
        </div>}
      </div>
    )
  }
}

export default RadialChart
