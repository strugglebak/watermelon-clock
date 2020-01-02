import React, { Component } from 'react'
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import http from '../../config/http'

import { connect } from 'react-redux'
import { initTodos, updateTodo } from '../../redux/actions/todosActions'

import './todos.styl'

export class todos extends Component<any> {

  get unDeletedTodos () { return this.props.todos.filter((todo: any) => !todo.deleted) }
  get unCompletedTodos () { return this.props.todos.filter((todo: any) => !todo.completed) }
  get completedTodos () { return this.props.todos.filter((todo: any) => todo.completed) }

  componentDidMount() {
    this.getTodos()
  }

  getTodos = async () => {
    try {
      const response = await http.get('/todos')
      const { resources } = response.data
      // mount 时需要对每个 todo 的编辑状态置为 false
      const newTodos = resources.map((todo: any) => {
        return Object.assign({}, todo, { editing: false })
      })
      this.props.initTodos(newTodos)
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="todos">
        <TodoInput />
        <main>
          <ul className="todo-list">
            {
              this.unCompletedTodos.map((todo: any) =>
                <TodoItem key={todo.id} {...todo}
                />
              )
            }
            {
              this.completedTodos.map((todo: any) =>
                <TodoItem key={todo.id} {...todo}
                />
              )
            }
          </ul>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todosReducer,
    ...ownProps
})

const mapDispatchToProps = {
  initTodos,
  updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(todos)
