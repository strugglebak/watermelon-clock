import React, { Component } from 'react'

import './polyline.styl'

interface IPolylineProps {
  data: any
  finishedCount: number
  width?: number
}

export class polyline extends Component
<IPolylineProps, any> {

  points = () => {
    const datesKeys = Object.keys(this.props.data).sort(
      (a, b) => {
        return Date.parse(a) - Date.parse(b)
      }
    )

    let { width } = this.props

    const firstDay = datesKeys[0]
    const startPoints = '0,60'
    const lastPoints = `${width},60`
    if (!firstDay) return [`${startPoints}`, `${lastPoints}`].join(' ')

    const lastDay = datesKeys[datesKeys.length - 1]
    const dayRange = Date.parse(lastDay) - Date.parse(firstDay)
    let count = 0
    let lastY
    // 画折线图需要 x y 坐标
    // 有断点的折线图每个 x y 都是有范围的
    // 所以这里需要除一个 range
    const pointsArray = datesKeys.map((datesKey: any) => {
      const x = (Date.parse(datesKey) - Date.parse(firstDay)) / dayRange * (width || 320)
      count += this.props.data[datesKey].length
      const y = (1 -  (count / this.props.finishedCount)) * 60
      lastY = y
      return `${x},${y}`
    })
    return [`${startPoints}`, ...pointsArray, `${width},${lastY}`, `${lastPoints}`].join(' ')
  }

  render() {
    return (
      <svg className="polyline peity" width="100%" height="60">
        <polygon 
          fill="rgba(215,78,78,0.1)" 
          stroke="rgba(215,78,78,0.5)" 
          strokeWidth="1" 
          points={this.points()}
        />
      </svg>
    )
  }
}

export default polyline
