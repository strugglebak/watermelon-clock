import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import Polyline from './polyline'
import TodosHistory from './todosHistory/todosHistory'

import './statistics.styl'

interface IStatisticsProps {
  todos: any[]
}

export class statistics extends Component
<IStatisticsProps, any> {

  get finishedTodos() { 
    return this.props.todos.filter((todo: any) => todo.completed && !todo.deleted) 
  }

  get dailyTodos() {
    // 这里获取到的是当天更新的 todos
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d')
    })
  }

  render() {
    return (
      <>
      <ul className="statistics">
        <li>
          <h3 className="title">统计</h3>
          <p className="description">一周统计</p>
        </li>
        <li>
          <h3 className="title">西瓜历史</h3>
          <p className="description">累计完成西瓜</p>
        </li>
        <li>
          <h3 className="title">任务历史</h3>
          <p className="description">累计完成任务 {this.finishedTodos.length} 个</p>
          <Polyline
            data={this.dailyTodos}
            finishedTodosCount={this.finishedTodos.length}
          />
        </li>
      </ul>
      <TodosHistory />
      </>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todosReducer,
    ownProps
})

export default connect(mapStateToProps)(statistics)

