import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { DropOption, TableFinder, Button, Operation, Text } from 'components'
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
    const { onDeleteItem, onEditItem, onViewItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>时间</Trans>,
        dataIndex: 'time',
        key: 'time',
        fixed: 'left',
      },
      {
        title: <Trans>等级</Trans>,
        dataIndex: 'level',
        key: 'level',
        // render: (text) => text == '3' ? <span style={{ color: '#ed5565' }}>{text}</span> : text
        render:(text)=> {
            if (text == '3') {
              return <span style={{ color: '#ed5565' }}>{'高危'}</span>
            }else if(text == '2'){
              return <span>{'中危'}</span>
            }else{
              return <span>{'低危'}</span>
            }
        }
      },
      {
        title: <Trans>事件名称</Trans>,
        dataIndex: 'eventname',
        key: 'eventname',
      },
      {
        title: <Trans>事件类型</Trans>,
        dataIndex: 'eventtype',
        key: 'eventtype',
      },
      {
        title: <Trans>源IP</Trans>,
        dataIndex: 'srcip',
        key: 'srcip',
        render: (text) => <Text data={text} />
      },
      {
        title: <Trans>目标IP</Trans>,
        dataIndex: 'dstip',
        key: 'dstip',
        render: (text) => <Text data={text} />
      },
      {
        title: <Trans>威胁地址</Trans>,
        dataIndex: 'detail',
        key: 'detail',
        render: (text) => <Text data={text} />
      },
      {
        title: <Trans>频次</Trans>,
        dataIndex: 'freq',
        key: 'freq',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'view') {
              onViewItem(record)
            }
          }
          return <Operation data={['view', 'ignore']} onClick={onClick} />
          // return (
          //   <div>
          //     <Button type="success" size="small" className="margin-right" onClick={_ => onViewItem(record)}>详情</Button>
          //     <DropOption
          //       onMenuClick={e => this.handleMenuClick(record, e)}
          //       menuOptions={[
          //         { key: '1', name: i18n.t`Update` },
          //         { key: '2', name: i18n.t`Delete` },
          //       ]}
          //     />
          //   </div>
          // )
        },
      },
    ]

    return (
      <TableFinder
        {...tableProps}
        pagination={false}
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
