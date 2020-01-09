import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Modal from './components/Modal'

@withI18n()
@connect(({ assetsDiscover, loading }) => ({ assetsDiscover, loading }))
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
    const { dispatch, assetsDiscover, i18n } = this.props
    const { selectedRowKeys } = assetsDiscover

    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }

    // if (key === '1') {
    //   dispatch({
    //     type: 'assetsDiscover/showModal',
    //     payload: {
    //       modalType: 'create',
    //     },
    //   })
    // }
  }

  get modalProps() {
    const { dispatch, assetsDiscover, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = assetsDiscover

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`assetsDiscover/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`添加资产` :
        modalType === 'update' ? i18n.t`编辑资产` : i18n.t`资产详情`
      }`,
      onOk: data => {
        if (modalType === 'detail') {
          dispatch({
            type: 'assetsDiscover/hideModal',
          })
          return
        }
        dispatch({
          type: `assetsDiscover/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'assetsDiscover/hideModal',
        })
      },
      showCancel: modalType !== 'detail',
    }
  }

  get listProps() {
    const { dispatch, assetsDiscover, loading } = this.props
    const { list, pagination, selectedRowKeys } = assetsDiscover

    return {
      dataSource: list,
      loading: loading.effects['assetsDiscover/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'assetsDiscover/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'assetsDiscover/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onViewItem(item) {
        dispatch({
          type: 'assetsDiscover/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'assetsDiscover/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  render() {
    return (
      <Page inner>
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          <Button type="danger" size="small" className="margin-right" onClick={() => this.handleItems('0')}><Icon type="delete" />批量删除</Button>
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-bottom" />导入</Button>
          <Button type="primary" size="small" onClick={() => this.handleItems('3')}><Icon type="vertical-align-top" />导出</Button>
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  assetsDiscover: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
