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
    return _.groupBy(this.props.todos, (todo: any) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d')
    })
  } 
  get finishedDatesKeys() {
    return Object.keys(this.dailyFinshedTodos).sort(
      // 倒叙排列
      (a, b) => Date.parse(b) - Date.parse(a)
    )
  }

  render() {
    const finishedTodsList = this.finishedDatesKeys.map(
      (datesKey: any) => {
        return (
          <div className="daily-todos" key={datesKey}>

            <div className="summery">
              <p className="date">
                <span>{datesKey}</span>
                <span>周五</span>
              </p>
            </div>

            <div className="todos-list">
              {
                this.dailyFinshedTodos[datesKey].map(
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
					<div className="todo-history">
						{finishedTodsList}
					</div>
				</TabPane>
				<TabPane tab="已删除的任务" key="2">
					<div className="todo-history">
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
