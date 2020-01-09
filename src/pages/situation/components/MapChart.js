import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import 'echarts/map/js/world'
import 'echarts/map/js/china'
import ReactEcharts from 'echarts-for-react'
import { Trans, withI18n } from '@lingui/react'
import { world, china } from 'utils/geoCoord'
import styles from './CardList.less'

const colors = ['#985f38', '#354617', '#8d3fa4', '#173532']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

// const update = (data = []) => {
//   return data.map((n) => {
//     const size = n.counts / 8 > 4
//     const color = getRandomColor()
//     // const color = size ? '#8d4295' : '#4989fd'

//     return {
//       name: n.name,
//       value: n.geoCoord,
//       symbol: 'circle',
//       symbolSize: size ? 16 : 4,
//       itemStyle: {
//         color,
//       },
//     }
//   })
// }

// const map = {
//   backgroundColor: '#000',
//   geo: {
//     map: 'world',
//     left: 0,
//     top: 0,
//     right: 0,
//     bottom: 0,
//     // roam: 'scale',
//     itemStyle: {
//       normal: {
//         borderWidth: 1,
//         borderColor: '#009999',
//         areaColor: 'transparent',
//       },
//       emphasis: {
//         areaColor: 'transparent',
//       },
//     },
//     label: {
//       emphasis: {
//         show: true,
//         color: '#fff'
//       },
//     },
//   },
//   tooltip: {
//     trigger: 'item',
//     formatter: (params, ticket, callback) => {
//       return `${params.name} : ${params.data.symbolSize}`
//     },
//   },
//   series: [{
//     type: 'effectScatter',
//     coordinateSystem: 'geo',
//     zlevel: 3,
//     rippleEffect: {
//       brushType: 'stroke',
//     },
//     label: {
//       normal: {
//         show: false,
//         position: 'left',
//         formatter: '{b} ',
//       },
//     },
//     data: [],
//   }],
// }

// const data = [{
//   attack_source: 'China',
//   counts: 80,
// }, {
//   attack_source: 'South Africa',
//   counts: 40,
// }, {
//   attack_source: 'Brazil',
//   counts: 30,
// }, {
//   attack_source: 'United Kingdom',
//   counts: 50,
// }, {
//   attack_source: 'United States',
//   counts: 60,
// }, {
//   attack_source: 'Canada',
//   counts: 20,
// }]

// map.series[0].data = update(data.map((n) => {
//   return {
//     ...n,
//     name: n.attack_source,
//     geoCoord: world[n.attack_source],
//   }
// }))

@withI18n()
class LineChart extends PureComponent {
  getOption = (mapType) => {
    const data_world = [{
      name: 'China',
      data: [
        [{ name: 'China' }, { name: 'South Africa', value: 40 }],
        [{ name: 'China' }, { name: 'Brazil', value: 30 }],
        [{ name: 'China' }, { name: 'United Kingdom', value: 50 }],
        [{ name: 'China' }, { name: 'United States', value: 60 }],
        [{ name: 'China' }, { name: 'Canada', value: 20 }],
      ],
    }, {
      name: 'South Africa',
      data: [
        [{ name: 'South Africa' }, { name: 'China', value: 80 }],
      ]
    }, {
      name: 'Brazil',
      data: [
        [{ name: 'Brazil' }, { name: 'China', value: 80 }],
      ]
    }, {
      name: 'United Kingdom',
      data: [
        [{ name: 'United Kingdom' }, { name: 'China', value: 80 }],
      ]
    }, {
      name: 'United States',
      data: [
        [{ name: 'United States' }, { name: 'China', value: 80 }],
      ]
    }, {
      name: 'Canada',
      data: [
        [{ name: 'Canada' }, { name: 'China', value: 80 }],
      ]
    }]

    const data_china = [{
      name: '上海',
      data: [
        [{ name: '上海' }, { name: '新疆', value: 40 }],
        [{ name: '上海' }, { name: '西藏', value: 30 }],
        [{ name: '上海' }, { name: '青海', value: 50 }],
        [{ name: '上海' }, { name: '北京', value: 60 }],
        [{ name: '上海' }, { name: '辽宁', value: 20 }],
      ],
    }, {
      name: '新疆',
      data: [
        [{ name: '新疆' }, { name: '上海', value: 80 }],
      ]
    }, {
      name: '西藏',
      data: [
        [{ name: '西藏' }, { name: '上海', value: 80 }],
      ]
    }, {
      name: '青海',
      data: [
        [{ name: '青海' }, { name: '上海', value: 80 }],
      ]
    }, {
      name: '北京',
      data: [
        [{ name: '北京' }, { name: '上海', value: 80 }],
      ]
    }, {
      name: '辽宁',
      data: [
        [{ name: '辽宁' }, { name: '上海', value: 80 }],
      ]
    }]

    const convertData = function (data, coordMap) {
      return data.reduce((acc, item) => {
        const fromName = item[0].name
        const toName = item[1].name
        const fromCoord = coordMap[fromName]
        const toCoord = coordMap[toName]
        if (fromCoord && toCoord) {
          return [...acc, {
            fromName,
            toName,
            coords: [fromCoord, toCoord],
          }]
        }
      }, [])
    }

    const convertValues = function (data, coordMap) {
      return data.reduce((acc, item, i) => {
        acc.push({
          name: item.name,
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            delay: 1000,
            trailLength: 0.9,
            color: getRandomColor(),
            symbolSize: 3,
          },
          lineStyle: {
            normal: {
              color: getRandomColor(),
              width: 0,
              curveness: 0.2,
            },
          },
          data: convertData(item.data, coordMap),
        }, {
          name: item.name,
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke',
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}',
            },
          },
          // symbolSize: 16,
          symbolSize(val) {
            return val[2] / 2.5
          },
          itemStyle: {
            normal: {
              color: getRandomColor(),
            },
          },
          data: item.data.map((v) => {
            return {
              name: v[1].name,
              value: coordMap[v[1].name].concat([v[1].value]),
              symbol: 'circle',
              // symbolSize: 16,
              itemStyle: {
                color: getRandomColor(),
              },
            }
          }),
        })
        return acc
      }, [])
    }

    const data = mapType === 'world' ? data_world : data_china
    const coordMap = mapType === 'world' ? world : china
    const series = convertValues(data, coordMap)

    const option = {
      backgroundColor: '#000',
      geo: {
        map: mapType || 'world',
        left: '10%',
        top: 0,
        right: '10%',
        bottom: 0,
        // roam: 'scale',
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: '#009999',
            areaColor: 'transparent',
          },
          emphasis: {
            areaColor: 'transparent',
          },
        },
        label: {
          emphasis: {
            show: true,
            color: '#fff'
          },
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params, ticket, callback) => {
          return `${params.name} : ${params.data ? params.data.value[2] : ''}`
        },
      },
      series,
    }

    console.log('option', option)

    return option
  }

  render() {
    const { mapType } = this.props
    return (
    	<div className={styles.map}>
      	<ReactEcharts ref="map" option={this.getOption(mapType)} className={styles['echarts-map']} />
      </div>
    )
  }
}

export default LineChart
