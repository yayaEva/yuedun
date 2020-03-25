import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message } from 'antd'
import { withI18n,Trans} from '@lingui/react'
import { Page, Button ,Text,Operation} from 'components'
import { stringify } from 'qs'
// import { Button, Operation, Text } from 'components'
// import { Trans, withI18n } from '@lingui/react'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import exportExcel from './exportExcel'


@withI18n()
@connect(({ event, loading }) => ({ event, loading }))
class Index extends PureComponent {
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    router.replace({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  handleItems = (key) => {
    const { dispatch, event, i18n } = this.props
    const { selectedRowKeys } = event

    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }
  }

  get modalProps() {
    const { dispatch, event, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = event

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`event/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`Create Event` : i18n.t`Update Event`
      }`,
      onOk: data => {
        dispatch({
          type: `event/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'event/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, event, loading } = this.props
    const { list=[], pagination, selectedRowKeys } = event.pageEvent

    return {
      dataSource: list,
      loading: loading.effects['event/pageEvent'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'event/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
                pageSize: pagination.pageSize,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'event/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onViewItem(item) {},
      rowSelection: {
        // selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'event/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  get filterProps() {
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'event/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('0')}>批量导出</Button>
          {/* <Button type="primary" size="small" onClick={() => this.handleItems('1')}>全部导出</Button> */}
          <Button type="primary" size="small" onClick={() => exportExcel(columns,this.listProps.dataSource)}>全部导出</Button>
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  event: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
