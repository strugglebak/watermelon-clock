import React, { Component } from 'react'
import { Tabs } from 'antd'
import MonthlyHistoryCore from './monthlyHistoryCore'

import './monthlyHistory.styl'

const TabPane = Tabs.TabPane

interface IWeeklyHistoryProps {
  finishedTodos: any[]
  finishedWaterMelons: any[]
  width: number
}

export class weeklyHistory extends Component
<IWeeklyHistoryProps, any> {

  get finishedTodos() { 
    // return this.props.finishedTodos.map(todo => ({calTime: todo.completed_at, id: todo.id}))
    // 暂时这么写
    return this.props.finishedTodos.map(todo => ({calTime: todo.updated_at, id: todo.id}))
  }

  get finishedWaterMelons() {
     return this.props.finishedWaterMelons.map(wm => ({calTime: wm.started_at, id: wm.id}))
  }

  render() {
    const { width } = this.props
    return (
      <Tabs defaultActiveKey="1">
				<TabPane tab="西瓜统计" key="1">
					<div className="monthly-history">
            <MonthlyHistoryCore
              finishedData={this.finishedWaterMelons}
              width={width}
            />
					</div>
				</TabPane>
				<TabPane tab="任务统计" key="2">
					<div className="monthly-history">
            <MonthlyHistoryCore
              finishedData={this.finishedTodos}
              width={width}
            />
					</div>
				</TabPane>
			</Tabs>
    )
  }
}

export default weeklyHistory
