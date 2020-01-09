import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './Completed.less'
import stylesCard from './CardList.less'

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={8} textAnchor="end" fontSize={10} fill="#42dda9">{payload.value}</text>
      </g>
    );
  }
}

function Completed({ data }) {
  return (
    <div className={classnames(styles.sales, stylesCard.card)} style={{ padding: '0 20px' }}>
      <div className={stylesCard.echarts}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ left: -24 }}>
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{
              paddingTop: 22,
              paddingBottom: 12,
              fontSize: 12,
              color: '#c2c6c2',
              transform: 'scale(.833333)',
            }}
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: '#222', strokeWidth: 1 }}
            tickLine={false}
            tick={<CustomizedAxisTick />}
          />
          <YAxis
            axisLine={{ stroke: '#222', strokeWidth: 1 }}
            tickLine={false}
            tick={<CustomizedAxisTick />}
          />
          <CartesianGrid
            horizontal={true}
            vertical={true}
            stroke={'#222'}
            strokeWidth={1}
            strokeDasharray="0 0"
          />
          <Tooltip
            contentStyle={{
              border: 'none',
              borderRadius: 5,
              color: '#fff',
              backgroundColor: 'rgba(50, 50, 50, 0.5)',
            }}
          />
          <Area
            type="monotone"
            dataKey="接口号1"
            stroke={'#0da6a6'}
            fill={'#0da6a6'}
            strokeWidth={0}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="接口号2"
            stroke={'#04c65f'}
            fill={'#04c65f'}
            strokeWidth={0}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Completed
