import React, { Component } from 'react'

interface IPolylineProps {
  data: any
  finishedTodosCount: number
}

export class polyline extends Component
<IPolylineProps, any> {

  points = () => {
    const datesKeys = Object.keys(this.props.data).sort(
      (a, b) => {
        return Date.parse(a) - Date.parse(b)
      }
    )

    const firstDay = datesKeys[0]
    const startPoints = '0,60'
    const lastPoints = '240,60'
    if (!firstDay) return [`${startPoints}`, `${lastPoints}`].join(' ')

    const lastDay = datesKeys[datesKeys.length - 1]
    const dayRange = Date.parse(lastDay) - Date.parse(firstDay)
    let count = 0
    // 画折线图需要 x y 坐标
    // 有断点的折线图每个 x y 都是有范围的
    // 所以这里需要除一个 range
    const pointsArray = datesKeys.map((datesKey: any) => {
      const x = (Date.parse(datesKey) - Date.parse(firstDay)) / dayRange * 240
      count += this.props.data[datesKey].length
      const y = (1 -  (count / this.props.finishedTodosCount)) * 60
      return `${x},${y}`
    })
    return [`${startPoints}`, ...pointsArray, `${lastPoints}`].join(' ')
  }

  render() {
    return (
      <div className="polyline">
        <svg>
          <polygon 
            fill="rgba(215,78,78,0.1)" 
            stroke="rgba(215,78,78,0.5)" 
            strokeWidth="1" 
            points={this.points()}
          />
				</svg>
      </div>
    )
  }
}

export default polyline
