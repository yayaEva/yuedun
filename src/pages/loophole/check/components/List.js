import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { DropOption, TableFinder, Button, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>ID</Trans>,
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
      },
      {
        title: <Trans>站点</Trans>,
        dataIndex: 'sitename',
        key: 'sitename',
      },
      {
        title: <Trans>状态</Trans>,
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: <Trans>源IP</Trans>,
        dataIndex: 'sourceIp',
        key: 'sourceIp',
      },
      {
        title: <Trans>高危</Trans>,
        dataIndex: 'count3',
        key: 'count3',
        render: (text) => <span style={{ color: '#ed5565' }}>{text}</span>
      },
      {
        title: <Trans>中危</Trans>,
        dataIndex: 'count2',
        key: 'count2',
        render: (text) => <span style={{ color: '#f5be5b' }}>{text}</span>
      },
      {
        title: <Trans>低危</Trans>,
        dataIndex: 'count',
        key: 'count',
        render: (text) => <span style={{ color: '#1ab394' }}>{text}</span>
      },
      {
        title: <Trans>扫描时间</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => text ? text.substr(0, 10) : '-'
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'view') {
              this.handleMenuClick(record, { key: '1' })
            } else if (key === 'del') {
              this.handleMenuClick(record, { key: '2' })
            }
          }
          return <Operation data={['view', 'del', 'statement']} onClick={onClick} />
        },
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
