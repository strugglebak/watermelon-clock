import React, { Component } from 'react'
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import http from '../../config/http'

import { connect } from 'react-redux'
import { addTodo } from '../../redux/actions'

import './todos.styl'

interface ITodosState {
  todos: any[]
}

export class todos extends Component<any, ITodosState> {

  constructor(props: any) {
    super(props);
    this.state = {
      todos: []
    }
  }

  get unDeletedTodos () { return this.state.todos.filter(todo => !todo.deleted) }
  get unCompletedTodos () { return this.state.todos.filter(todo => !todo.completed) }
  get completedTodos () { return this.state.todos.filter(todo => todo.completed) }

  componentDidMount() {
    this.getTodos()
  }

  updateTodo = async (id: number, params: any) => {
    const {todos} = this.state
    try {
      const response = await http.put(`/todos/${id}`, params)
      // 对比 id 找到点击 checkbox 完成的 todo 然后更新对应项
      const newTodos = todos.map(todo => {
        return id === todo.id ? response.data.resource : todo
      })
      this.setState({todos: newTodos})
    } catch (e) {
      throw new Error(e)
    }
  }

  getTodos = async () => {
    try {
      const response = await http.get('/todos')
      const { resources } = response.data
      // mount 时需要对每个 todo 的编辑状态置为 false
      const newTodos = resources.map((todo: any) => {
        return Object.assign({}, todo, { editing: false })
      })
      this.setState({ todos: newTodos })
    } catch (e) {
      throw new Error(e)
    }
  }

  // 双击 todo 能进入编辑状态
  getIntoEditingState = (id: number) => {
    const { todos } = this.state
    // 这里依然是通过 id 比对然后更新对应项的 editing 状态
    const newTodos = todos.map(todo => {
      return id === todo.id
        ? Object.assign({}, todo, { editing: true })
        : Object.assign({}, todo, { editing: false })
    })
    this.setState({ todos: newTodos })
  }

  render() {
    return (
      <div className="todos">
        <TodoInput />
        <main>
          <ul className="todo-list">
            {
              this.unCompletedTodos.map(todo =>
                <TodoItem key={todo.id} {...todo}
                  updateTodo={this.updateTodo}
                  getIntoEditingState={this.getIntoEditingState}
                />
              )
            }
            {
              this.completedTodos.map(todo =>
                <TodoItem key={todo.id} {...todo}
                  updateTodo={this.updateTodo}
                  getIntoEditingState={this.getIntoEditingState}
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
  todos: state.todos,
  ...ownProps
})

const mapDispatchToProps = {
  addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(todos)
