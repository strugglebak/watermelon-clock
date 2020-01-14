import React, { Component } from 'react'
import { format, getDaysInMonth } from 'date-fns'
import DotLine from './dotLine'

interface IMonthlyHistoryCoreProps {
  finishedData: any
  width: number
}

interface IMonthlyHistoryCoreState {
  currentMonth: string
  currentYear: string
}

export class monthlyHistoryCore extends Component
<IMonthlyHistoryCoreProps, IMonthlyHistoryCoreState> {
  constructor(props: IMonthlyHistoryCoreProps) {
    super(props)
    this.state = {
      currentMonth: format(new Date(), 'MM'),
      currentYear: format(new Date(), 'yyyy')
    }
  }

  get monthData(){
    const { finishedData } = this.props
    const { currentMonth, currentYear } = this.state
    return finishedData
      .filter(
        (data: any) => 
        format(new Date(data.calTime), 'MM') === currentMonth
       )
      .filter(
        (data: any) => 
        format(new Date(data.calTime), 'yyyy') === currentYear
      )
  }

  get dotLineData() {
    const { currentMonth, currentYear } = this.state
    const totalDays = getDaysInMonth(new Date(`${currentYear}-${currentMonth}-1`))

    // 初始化 map
    let arr = [...Array(totalDays)]
    const map = new Map()
    arr.forEach((item, index) => {
      const currentDay = index + 1
      const date = `${currentYear}-${currentMonth}-${
        currentDay < 10
          ? `0${currentDay}`
          : currentDay
      }`
      map.set(date, [])
    })

    // 将相同日期的数据组合进一个 list 中
    this.monthData.forEach((item: any) => {
      const date = format(new Date(item.calTime), 'yyyy-MM-dd')
      const list = map.get(date)
      list.push(item)
      map.set(date, list)
    })

    const data: any = {}
    for (const [key, value] of map) {
      data[key] = value
    }

    return { data, xRange: totalDays}
  }

  render() {

    const { width } = this.props
    const {data, xRange} = this.dotLineData
    return (
      <div className="monthly-history-core">
        <DotLine data={data} xRange={xRange} width={width} />
      </div>
    )
  }
}

export default monthlyHistoryCore
