import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip, Icon } from 'antd'
import classnames from 'classnames'
import styles from './Button.less'

class Index extends PureComponent {
  render() {
    const { children, type = 'default', className, ghost, menu,  ...restProps } = this.props
    const btnCls = classnames([styles[type]], {
      [styles[`${type}--ghost`]]: ghost,
      [className || '']: true,
    })
    const btnView = <Button className={btnCls} size={'default'} {...restProps} ghost={ghost}>
      {children}
      {menu && <Icon type="down" />}
    </Button>

    if (!menu) {
      return btnView
    }

    return (
      <Tooltip
        placement="bottomRight"
        trigger="click"
        overlayClassName={styles.overlay}
        title={menu}
      >
        {btnView}
      </Tooltip>
    )
  }
}

export default Index
