import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Loader from '../Loader'
import styles from './Page.less'

export default class Page extends Component {
  render() {
    const { className, pageStyle, children, loading = false, inner = false, hasPadding = false } = this.props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
      ...pageStyle,
    }
    return (
      <div
        className={classnames(className, {
          [styles.contentInner]: inner,
          [styles.contentInnerPadding]: hasPadding,
        })}
        style={loading ? loadingStyle : pageStyle}
      >
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    )
  }
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  inner: PropTypes.bool,
  hasPadding: PropTypes.bool,
}
