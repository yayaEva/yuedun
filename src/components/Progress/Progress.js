import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Progress } from 'antd'
import { Text } from 'components'
import styles from './Progress.less'

export default class Index extends Component {
  render() {
    const { className, headerClass, textClass, title, percent, value, textColor, ...restProps } = this.props
    return (
      <div className={classnames(styles.progress, className)}>
        {title ? <div className={classnames(styles.header, headerClass)}><Text data={title} /></div> : null}
        <div className={styles.body}>
          <Progress percent={percent} showInfo={false} status="active" {...restProps} />
          {value ? <div className={classnames(styles.text, textClass)} style={{ color: textColor }}>{value}</div> : null}
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  title: PropTypes.string,
  percent: PropTypes.number,
  value: PropTypes.string,
}
