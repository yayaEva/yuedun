import React from 'react'
import PropTypes from 'prop-types'

/**
 * 防止某些浏览器下文本被强制添加超链接（如 ip 地址等）
 * 等待验证是否可以阻止添加超链接
 */
const Text = ({
  data,
  wrapStyle,
  ...restProps
}) => {
  const dataArray = data.split('')
  return (
    <span style={wrapStyle} {...restProps}>
      {dataArray.length > 0 ? dataArray.map((item, index) => (
        <span key={index}>
          {item}
        </span>
      )) : null}
    </span>
  )
}

Text.propTypes = {
  data: PropTypes.string,
  wrapStyle: PropTypes.string,
}

export default Text
