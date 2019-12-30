import React, { Component } from 'react'
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import http from '../../config/http'

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

  componentDidMount() {
    this.getTodos()
  }

  addTodo = async (params: any) => {
    const { description } = params
    const { todos } = this.state
    try {
      const response = await http.post('/todos', { description })
      this.setState({
        todos: [response.data.resource, ...todos]
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  updateTodo = async (id: number, params: any) => {
    const {todos} = this.state
    try {
      const response = await http.put(`/todos/${id}`, params)
      // 对比 id 找到点击 checkbox 完成的 todo 然后更新对应项
      const newTodos = todos.map(todo=> {
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
      this.setState({
        todos: response.data.resources
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="todos">
        <TodoInput addTodo={this.addTodo} />
        <main>
          <ul>
            {
              this.state.todos.map(
                todo=><TodoItem key={todo.id} {...todo} updateTodo={this.updateTodo}/>
              )
            }
          </ul>
        </main>
      </div>
    )
  }
}

export default todos
