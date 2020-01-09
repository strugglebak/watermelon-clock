import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import { Tabs } from 'antd'
import TodosHistoryItem from './todosHistoryItem'

import './todosHistory.styl'

const TabPane = Tabs.TabPane

interface ITodosHistoryProps {
  todos: any[]
}

export class todosHistory extends Component
<ITodosHistoryProps, any> {

  get finishedTodos() {
    return this.props.todos.filter((todo: any) => todo.completed && !todo.deleted)
  }
  get deletedTodos() {
    return this.props.todos.filter((todo: any) => todo.deleted)
  }
  get dailyFinshedTodos() {
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-dd')
    })
  } 
  get finishedDatesKeys() {
    return Object.keys(this.dailyFinshedTodos).sort(
      // 倒序排列
      (a, b) => Date.parse(b) - Date.parse(a)
    )
  }

  dayOfWeekTransfer = (date: string) => {
    const dayMap = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const index = parseInt(format(new Date(date), 'i'), 10) - 1
    return dayMap[index]
  }
  yearMonthDayTransfer = (date: string) => {
    const arr = date.split('-')
    return `${arr[0]}年${arr[1]}月${arr[2]}日`
  }

  render() {
    const finishedTodsList = this.finishedDatesKeys.map(
      (datesKey: any) => {
        const todos = this.dailyFinshedTodos[datesKey]
        return (
          <div className="daily-todos" key={datesKey}>

            <div className="summary">
              <div className="date-wrapper">
                <p className="date">
                  <span className="year-month-day">{this.yearMonthDayTransfer(datesKey)}</span>
                  <span className="day">{this.dayOfWeekTransfer(datesKey)}</span>
                </p>
                <p className="finished-todos-count">完成了 {todos.length} 个任务</p>
              </div>
            </div>

            <div className="todos-list">
              {
                todos.map(
                  (todo: any) => 
                    <TodosHistoryItem
                      key={todo.id}
                      todo={todo}
                      itemType="finished"
                    />
                )
              }
            </div>
          </div>
        )
      }
    )

    const deletedTodosList = this.deletedTodos.map(
      (todo: any) => 
        <TodosHistoryItem
          key={todo.id}
          todo={todo}
          itemType="deleted"
        />
    )
    return (
      <Tabs defaultActiveKey="1">
				<TabPane tab="已完成的任务" key="1">
					<div className="todos-history">
						{finishedTodsList}
					</div>
				</TabPane>
				<TabPane tab="已删除的任务" key="2">
					<div className="todos-history">
						{deletedTodosList}
					</div>
				</TabPane>
			</Tabs>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todosReducer,
  ...ownProps
})

export default connect(mapStateToProps)(todosHistory)
