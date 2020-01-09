import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Tooltip } from 'antd'
import styles from './Operation.less'

const MAPS = {
  view: {
    icon: '/icons/view.svg',
    title: '详情',
  },
  filter: {
    icon: '/icons/filter.svg',
    title: '过滤',
  },
  ignore: {
    icon: '/icons/ignore.svg',
    title: '忽略',
  },
  edit: {
    icon: '/icons/edit.svg',
    title: '编辑',
  },
  del: {
    icon: '/icons/del.svg',
    title: '删除',
  },
  ['export']: {
    icon: '/icons/export.svg',
    title: '导出',
  },
  statement: {
    icon: '/icons/statement.svg',
    title: '报告',
  },
  generate: {
    icon: '/icons/generate.svg',
    title: '生成',
  },
}

class Index extends PureComponent {
  render() {
    const { data = [], onClick, wrapStyle } = this.props
    return (
      <div className={styles.wrap} style={wrapStyle}>
        {data.map((v) => {
          if (typeof v !== 'object') {
            return {
              ...MAPS[v],
              key: v,
            }
          }
          return {
            ...MAPS[v.key],
            ...v,
          }
        }).map((v) => {
          return (
            <Tooltip title={v.title} key={v.key}>
              <Avatar className="anticon" src={v.icon} onClick={_ => onClick(v.key)} />
            </Tooltip>
          )
        })}
      </div>
    )
  }
}

Index.defaultProps = {
  data: ['view', 'filter', 'ignore'],
  onClick(key) {},
  wrapStyle: {},
}

Index.propsTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
  wrapStyle: PropTypes.object,
}

export default Index
