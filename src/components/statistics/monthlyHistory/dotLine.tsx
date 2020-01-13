import React, { Component } from 'react'
import { Tooltip } from 'antd'

interface IDotLineProps {
  data: any
  xRange: number
  width: number
}

export class dotLine extends Component
<IDotLineProps> {

  points = () => {
    const { data, xRange, width } = this.props
    let yRange = Object.keys(data).reduce(
      (acc, cur) => {
        return acc > data[cur].length ? acc : data[cur].length
      }
    , 0)
    yRange === 0 && (yRange = 5)
    return Object.keys(data).map(
      date => {
        const x = (new Date(date).getDate() - 0.5) / xRange * width
        const y = (1 - data[date].length / yRange) * 160 + 10
        return [x, y, data[date].length]
      }
    )
  }

  render() {
    const { width } = this.props
    return (
      <div className="dot-line">
        <svg width='100%' height='200'>
          <rect x={0} y={0} width={width} height={170}/>
          <path 
            d={
              this.points().reduce(
                // M,x,y,x1,y1 的形式画直线
                (acc, cur) => acc.concat(`${cur.slice(0,2).join(',')},`),
                'M'
              )
            }
           />
          {
            // x 坐标轴上的值显示 1 2 3 4...
            this.points().map(
              (point, index) => (
                <text key={index} x={point[0] - 5} y="200">
                  {index + 1}
                </text>
            ))
          }
          {
            this.points().map((point, index) => (
              <Tooltip 
                key={index} placement="top" 
                title={`${point[2]}`} overlayClassName='daily_tips'>
                {/* 坐标点对应的⚪ */}
                <circle r="5" cx={point[0]} cy={point[1]} />
              </Tooltip>
            ))
          }
        </svg>
      </div>
    )
  }
}

export default dotLine
