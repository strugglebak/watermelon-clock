import React, { Component } from 'react'

// import './barChart.styl'

interface IBarChartProps {
  data: any[]
  finishedCount: number
}

const height = 60

export class barChart extends Component
<IBarChartProps> {
  points = () => {
    const { data, finishedCount } = this.props
    console.log('data', data)
    const xRange = 10
    const yRange = data.reduce(
      (acc, cur) => acc > cur.length ? acc : cur.length,
      0
    )
    return data.map((item, index) => {
      const x = (index + 3) / xRange * finishedCount - 8
      let y = (1 - item.length / yRange) * height
      y === height && (y = height - 1)
      return [x, y]
    })
  }

  render() {
    return (
      <div className="bar-chart">
        <svg width='100%' height={height}>
        {
          this.points().map((point, index) => (
            <rect key={index} fill="rgba(215,78,78,0.5)" 
              x={point[0]} y={point[1]} 
              width={16} height={height - point[1]}
            />
          ))
        }
        </svg>
      </div>
    )
  }
}

export default barChart
