import React, { Component } from 'react'

import { Checkbox } from 'antd'

interface ITodoItemProps {
  key: number
  id: number
  user_id: number
  completed: boolean
  completed_at: null
  deleted: boolean
  description: string
  extra: any
  created_at: string
  updated_at: string
  updateTodo: (id: number, params: any) => void
}

export class todoItem extends Component<ITodoItemProps, any> {
  constructor(props: ITodoItemProps) {
    super(props);
  }

  update = (params: any) => {
    const {id} = this.props
    this.props.updateTodo(id, params)
  }

  render() {
    return (
      <li className="todo-item">
        <Checkbox className="checkbox" checked={this.props.completed}
          onChange={e => this.update({completed: e.target.checked})}
        />
        <span>{ this.props.description }</span>
      </li>
    )
  }
}

export default todoItem
