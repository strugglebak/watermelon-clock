import React, { Component } from 'react'
import { Checkbox, Icon } from 'antd'

import './todoItem.styl'

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
  editing: boolean
  getIntoEditingState: (id: number) => void
}

interface ITodoItemState {
  editingText: string
}

export class todoItem extends Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props)
    this.state = {
      editingText: this.props.description
    }
  }

  update = (params: any) => {
    const {id} = this.props
    this.props.updateTodo(id, params)
  }

  getIntoEditingState = () => {
    this.props.getIntoEditingState(this.props.id)
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editingText !== '') {
      this.update({
        description: this.state.editingText,
        editing: false
      })
    }
  }

  onBlur = (e: any) => {
    console.log(111)
    this.update({
      description: this.state.editingText,
      editing: false
    })
  }


  render() {

    const EditingUI = <div className="editing">
      <input className="editing-input" type="text" value={this.state.editingText}
        onChange={e => this.setState({editingText: e.target.value})}
        onKeyUp={this.onKeyUp}
        onBlur={this.onBlur}
      />
      <div className="icon-wrapper">
        <Icon type="enter" style={{
          cursor: 'pointer', fontSize: '16px'
        }}/>
        <Icon type="delete" style={{
          cursor: 'pointer', fontSize: '16px'
        }}/>
      </div>
    </div>

    const TextUI = <span onDoubleClick={this.getIntoEditingState}>{this.props.description}</span>

    return (
      <li className="todo-item">
        <Checkbox className="checkbox" checked={ this.props.completed }
          onChange={e => this.update({ completed: e.target.checked })}
        />
        {
          this.props.editing ? EditingUI : TextUI
        }
      </li>
    )
  }
}

export default todoItem
