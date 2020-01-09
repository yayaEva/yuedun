import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

class TableFinder extends PureComponent {
  state = {
    clientWidth: document.body.clientWidth,
  }

  componentDidMount(){
    window.addEventListener('resize', this.resizeListener)
    this.resizeListener()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }

  resizeListener = () => {
    this.setState({ clientWidth: document.body.clientWidth })
  }

  render() {
    const { style, maxWidth, ...tableProps } = this.props
    const divStyle = {
      maxWidth: maxWidth || '1.28125rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: '0 auto',
    }

    let columns = tableProps.columns.map((v) => ({ ...v, fixed: false, width: v.width }))
    columns = columns.map((v) => {
      return {
        ...v,
        render(text, record, index) {
          return <div style={{ ...divStyle, maxWidth: v.maxWidth || divStyle.maxWidth }}>{v.render ? v.render(text, record, index) : text}</div>
        },
      }
    })

    // let columns = tableProps.columns.map((v) => ({ ...v, width: v.width || 180 }))

    // calc scrollX
    // let scrollX = columns.reduce((acc, val) => (acc = acc + val.width), 0)

    // calc fixed
    // if (scrollX >= this.state.clientWidth) {
    //   columns[0].fixed = 'left'
    // } else {
    //   columns = columns.map((v) => ({ ...v, fixed: false }))
    // }

    return (
      <Table
        style={style}
        simple
        bordered
        size="middle"
        rowKey={record => record.id}
        {...tableProps}
        columns={columns}
        // scroll={{ x: scrollX }}
      />
    )
  }
}

export default TableFinder
