import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message, Tabs } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import router from 'umi/router'
import styles from './_layout.less'

const { TabPane } = Tabs
const TABS_DATA = [{
  label: '资产发现',
  value: 'discover',
}, {
  label: '资产备案',
  value: 'case',
}, {
  label: '资产分组',
  value: 'group',
}]

@withI18n()
@connect()
class List extends PureComponent {
  onTabChange = key => {
    const { match } = this.props
    switch (key) {
      case 'discover':
        router.push(`${match.url}/discover`)
        break
      case 'case':
        router.push(`${match.url}/case`)
        break
      case 'group':
        router.push(`${match.url}/group`)
        break
      default:
        break
    }
  }

  render() {
    const { match, children, location } = this.props
    const activeKey = location.pathname.replace(`${match.url}/`, '')

    return (
      <React.Fragment>
        {/*<div className={styles.wrap}>
          <Tabs type={'card'} activeKey={activeKey} onChange={this.onTabChange} tabBarStyle={{ borderWidth: 0, margin: 0 }}>
            {TABS_DATA.map((v) => <TabPane tab={v.label} key={v.value} />)}
          </Tabs>
        </div>*/}
        <div /*className={styles.inner}*/>{children}</div>
      </React.Fragment>
    )
  }
}

export default List
