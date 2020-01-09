import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import Filter from './components/Filter'

@withI18n()
@connect(({ whitelist, loading }) => ({ whitelist, loading }))
class Index extends PureComponent {
  handleRefresh = (values) => {
    const { dispatch } = this.props
    dispatch({
      type: 'whitelist/save',
      payload: values,
    })
  }

  get filterProps() {
    const { dispatch } = this.props

    return {
      filter: {},
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  whitelist: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
