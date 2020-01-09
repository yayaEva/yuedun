import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Icon, Menu } from 'antd'
import Button from '../Button/Button'

const DropOption = ({
  onMenuClick,
  menuOptions = [],
  buttonStyle,
  dropdownProps,
  buttonText = '更多'
}) => {
  const menu = menuOptions.map(item => (
    <Menu.Item key={item.key}>{item.name}</Menu.Item>
  ))
  return (
    <Dropdown
      overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
      {...dropdownProps}
    >
      <Button type="info" size="small" style={{ border: 'none', ...buttonStyle }}>
        {/*<Icon style={{ marginRight: 2 }} type="bars" />*/}
        <span style={{ marginRight: 0 }}>{buttonText}</span>
        <Icon type="down" />
      </Button>
    </Dropdown>
  )
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
  buttonText: PropTypes.string,
}

export default DropOption
