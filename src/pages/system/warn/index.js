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
@connect(({ systemWarn, loading }) => ({ systemWarn, loading }))
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
    const { dispatch, systemWarn, i18n } = this.props
    const { selectedRowKeys } = systemWarn

    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }

    if (key === '1') {
      dispatch({
        type: 'systemWarn/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  get modalProps() {
    const { dispatch, systemWarn, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = systemWarn

    return {
      type: modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`systemWarn/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`添加配置` :
        modalType === 'email' ? i18n.t`邮件配置` : i18n.t`编辑配置`
      }`,
      onOk: data => {
        dispatch({
          type: `systemWarn/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'systemWarn/hideModal',
        })
      },
      onMailSetting() {
        dispatch({
          type: 'systemWarn/hideModal',
        })
        setTimeout(() => {
          dispatch({
            type: 'systemWarn/showModal',
            payload: {
              modalType: 'email',
            },
          })
        }, 50)
      },
    }
  }

  get listProps() {
    const { dispatch, systemWarn, loading } = this.props
    const { list, pagination, selectedRowKeys } = systemWarn

    return {
      dataSource: list,
      loading: loading.effects['systemWarn/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        // dispatch({
        //   type: 'systemWarn/delete',
        //   payload: id,
        // }).then(() => {
        //   this.handleRefresh({
        //     page:
        //       list.length === 1 && pagination.current > 1
        //         ? pagination.current - 1
        //         : pagination.current,
        //   })
        // })
      },
      onEditItem(item) {
        // dispatch({
        //   type: 'systemWarn/showModal',
        //   payload: {
        //     modalType: 'update',
        //     currentItem: item,
        //   },
        // })
      },
      // rowSelection: {
      //   selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'systemWarn/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  render() {
    return (
      <Page inner>
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          <Button type="primary" size="small" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  systemWarn: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
