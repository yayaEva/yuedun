import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TableFinder } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

@withI18n()
class List extends PureComponent {
  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>接口名称</Trans>,
        dataIndex: 'eventName',
        key: 'eventName',
      },
      {
        title: <Trans>接口类型</Trans>,
        dataIndex: 'eventType',
        key: 'eventType',
      },
      {
        title: <Trans>接收字节</Trans>,
        dataIndex: 'jWord',
        key: 'jWord',
      },
      {
        title: <Trans>接收速率</Trans>,
        dataIndex: 'jSpeed',
        key: 'jSpeed',
      },
      {
        title: <Trans>发送字节</Trans>,
        dataIndex: 'fWord',
        key: 'fWord',
      },
      {
        title: <Trans>发送速率</Trans>,
        dataIndex: 'fSpeed',
        key: 'fSpeed',
      },
      {
        title: <Trans>链路模式</Trans>,
        dataIndex: 'mode',
        key: 'mode',
      },
      {
        title: <Trans>当前速率</Trans>,
        dataIndex: 'cSpeed',
        key: 'cSpeed',
      },
      {
        title: <Trans>接口状态</Trans>,
        dataIndex: 'status',
        key: 'status',
      },
    ]

    return (
      <TableFinder
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        columns={columns}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
