import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { DropOption, TableFinder, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

@withI18n()
class List extends PureComponent {
  render() {
    const { onEditItem, color = [], i18n, ...tableProps } = this.props
    const renderEl = (text, record, index) => <span style={{ color: color[index] }}>{text}</span>

    const columns = [
      {
        title: <Trans>事件名称</Trans>,
        dataIndex: 'eventname',
        key: 'eventname',
        width: 'auto',
        render: renderEl,
      },
      {
        title: <Trans>时间</Trans>,
        dataIndex: 'time',
        key: 'time',
        width: 'auto',
        render: (text, record, index) => renderEl(text ? text.substr(0, 10) : '-', record, index),
      },
      {
        title: <Trans>源IP</Trans>,
        dataIndex: 'srcip',
        key: 'srcip',
        width: 'auto',
        render: renderEl,
      },
      {
        title: <Trans>目标IP</Trans>,
        dataIndex: 'dstip',
        key: 'dstip',
        width: 'auto',
        render: renderEl,
      },
      {
        title: <Trans>等级</Trans>,
        dataIndex: 'level',
        key: 'level',
        width: 'auto',
        render: renderEl,
      },
      {
        title: <Trans>事件类型</Trans>,
        dataIndex: 'eventtype',
        key: 'eventtype',
        width: 'auto',
        render: (text, record, index) => renderEl(
          <div style={{ cursor: 'pointer' }} onClick={() => onEditItem(record)}>{text} <Icon type="eye" /></div>,
          record,
          index
        ),
      },
    ]

    return (
      <TableFinder
        {...tableProps}
        className={styles.table}
        columns={columns}
      />
    )
  }
}

List.propTypes = {
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
