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
    const { onDeleteItem, onEditItem, onExportItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (e.key === '3') {
      confirm({
        title: i18n.t`Are you sure generate this record?`,
        onOk() {
          onExportItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, onDownload, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>报表名称</Trans>,
        dataIndex: 'reportName',
        key: 'reportName',
      },
      {
        title: <Trans>生成时间</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: <Trans>下载</Trans>,
        dataIndex: 'download',
        key: 'download',
        render: (text, record) => <div className={styles.download}>
          <span onClick={_ => onDownload('0')}>HTML下载</span>
          <span onClick={_ => onDownload('1')}>PDF下载</span>
          <span onClick={_ => onDownload('2')}>XLS下载</span>
          <span onClick={_ => onDownload('3')}>DOC下载</span>
        </div>
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'del') {
              this.handleMenuClick(record, { key: '2' })
            } else if (key === 'generate') {
              this.handleMenuClick(record, { key: '3' })
            }
          }
          return <Operation data={['generate', 'del']} onClick={onClick} />
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
        maxWidth={'100%'}
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
