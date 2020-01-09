import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import Button from '../Button/Button'

const Index = ({
  onOk,
  onCancel,
  showCancel = true,
  children,
  ...modalProps,
}) => {
  const defaultProps = {
    destroyOnClose: true,
    maskClosable: false,
    closable: false,
    centered: true,
    width: '45%',
  }
  const footer = <div>
    <Button type="primary" onClick={onOk}>确定</Button>
    {showCancel ? <Button onClick={onCancel}>取消</Button> : null}
  </div>
  return (
    <Modal footer={footer} {...defaultProps} {...modalProps}>
      {children}
    </Modal>
  )
}

Index.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  showCancel: PropTypes.bool,
}

export default Index
