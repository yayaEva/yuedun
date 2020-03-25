import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload, dx = 0, dy = 8, rotate = 0,
    } = this.props;

    return (
      <g transform={`translate(${x},${y}) rotate(${rotate})`}>
        <text x={0} y={0} dy={dy} dx={dx} textAnchor="end" fontSize={10} fill="#666">{payload.value}</text>
      </g>
    );
  }
}

const IconView = ({ stroke = '#5f93b0', inactive = false }) => {
  const style = {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: 4,
    marginTop: -1,
  }
  return (
    <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1" style={style}>
      <path strokeWidth="4" fill="none" stroke={!inactive ? stroke : '#c2c6c2'} d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16" className="recharts-legend-icon"></path>
    </svg>
  )
}

const renderLegend = (props, onClick, inactive) => {
  const { payload } = props
  const spanStyle = {
    marginLeft: 4,
    marginRight: 4,
    cursor: 'pointer',
  }
  return (
    <div style={{ textAlign: 'center' }}>
      {
        payload.map((entry, index) => (
          <span key={`item-${index}`} style={spanStyle} onClick={_ => onClick(entry)}>
            <IconView stroke={entry.color} inactive={inactive && inactive.indexOf(entry.dataKey) !== -1} />{entry.value}
          </span>
        ))
      }
    </div>
  )
}

function fomart(data, inactive) {
  return data.reduce((acc, item) => {
    const result = {
      name: item.name,
    }
    for (let key in item) {
      if (key !== 'name') {
        if (!(inactive && inactive.indexOf(key) !== -1)) {
          result[key] = item[key]
        }
      }
    }
    return [
      ...acc,
      {...result},
    ]
  }, [])
}

function Completed({ data, onClick, inactive }) {
  return (
    <div className={styles.sales} style={{ padding: '0 10px' }}>
      <ResponsiveContainer height={300}>
        <AreaChart data={fomart(data, inactive)} margin={{ left: 0, bottom: 45, right: 45 }}>
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              paddingTop: 22,
              paddingBottom: 12,
              fontSize: 12,
              color: '#c2c6c2',
              // transform: 'scale(.833333)',
            }}
            content={(props) => renderLegend(props, onClick, inactive)}
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: '#222', strokeWidth: 1 }}
            tickLine={false}
            tick={<CustomizedAxisTick rotate={45} dy={0} dx={45} />}
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
            strokeWidth={0}
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
          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#5f93b0" stopOpacity={0.75}/>
              <stop offset="90%" stopColor="#5f93b0" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#b7ebe2" stopOpacity={0.75}/>
              <stop offset="90%" stopColor="#b7ebe2" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="事件数"
            stroke={'#5f93b0'}
            fill={'url(#color1)'}
            fillOpacity={1}
            strokeWidth={0}
            dot={false}
          />
          {/* <Area
            type="monotone"
            dataKey="DDOS攻击"
            stroke={'#b7ebe2'}
            fill={'url(#color2)'}
            fillOpacity={1}
            strokeWidth={0}
            dot={false}
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Completed
