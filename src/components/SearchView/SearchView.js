import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import styles from './SearchView.less'

function HOCFactory(WrappedComponent) {
  return class SearchView extends PureComponent {
    static defaultProps = {
      bordered: false,
      wrapStyle: {},
    }

    static propTypes = {
      bordered: PropTypes.bool,
      wrapStyle: PropTypes.object,
    }

    render() {
      const { bordered, wrapStyle, ...props } = this.props
      return (
        <Card className={styles.card} bordered={bordered} style={{ marginBottom: 20, ...wrapStyle }} bodyStyle={{ padding: '8px 16px' }}>
          <WrappedComponent {...props} />
        </Card>
      )
    }
  }
}

export default HOCFactory
