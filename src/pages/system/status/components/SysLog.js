import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TableFinder } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Input } from 'antd'
import styles from '../index.less'

const { Search } = Input

@withI18n()
class List extends PureComponent {
  render() {
    const { onDeleteItem, onEditItem, onSearch, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>ID</Trans>,
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: <Trans>日志类型</Trans>,
        dataIndex: 'logType',
        key: 'logType',
      },
      {
        title: <Trans>操作详情</Trans>,
        dataIndex: 'detail',
        key: 'detail',
      },
      {
        title: <Trans>操作时间</Trans>,
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
    ]

    const title = () => <div style={{ textAlign: 'right' }}>
      <Search placeholder={i18n.t`请输入关键字`} onSearch={(value) => onSearch({ name: value })} style={{ width: 180 }} />
    </div>

    return (
      <TableFinder
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        columns={columns}
        title={title}
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
