import React, { Component } from 'react'
import TodoInput from './todoInput'
import http from '../../config/http'

export class todos extends Component {

  addTodo = async (params: any) => {
    const { description } = params
    try {
      const response = await http.post('/todos', { description })
      console.log(response)
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="todos">
        <TodoInput addTodo={this.addTodo}/>
      </div>
    )
  }
}

export default todos
