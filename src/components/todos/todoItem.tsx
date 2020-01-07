import React, { Component } from 'react'
import { Checkbox, Icon } from 'antd'
import classNames from 'classnames'
import http from '../../config/http'

import { connect } from 'react-redux'
import {editingTodo, updateTodo} from '../../redux/actions/todosActions'

import './todoItem.styl'

interface ITodoItemProps {
  key: number
  id: number
  user_id: number
  completed: boolean
  completed_at: any
  deleted: boolean
  description: string
  extra: any
  created_at: string
  updated_at: string
  updateTodo: (payload: any) => any
  editingTodo: (payload: number) => any
  editing: boolean
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

  update = async (params: any) => {
    const {id} = this.props

    if (params.completed) {
      params.completed_at = new Date()
    }

    try {
      const response = await http.put(`/todos/${id}`, params)
      this.props.updateTodo(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  getIntoEditingState = () => {
    this.props.editingTodo(this.props.id)
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
    this.update({
      description: this.state.editingText,
      editing: false
    })
  }


  render() {

    const EditingUI = <div className="editing-input-wrapper">
      <textarea className="editing-input" value={this.state.editingText}
        onChange={e => this.setState({editingText: e.target.value.trim()})}
        onKeyUp={this.onKeyUp}
        onBlur={this.onBlur}
      />
      <div className="icon-wrapper">
        <Icon className="icon-enter" type="enter" style={{
            cursor: 'pointer', fontSize: '16px'
          }}
          onClick={e => this.update({description: this.state.editingText})}
          />
        <Icon className="icon-delete" type="delete" style={{
            cursor: 'pointer', fontSize: '16px'
          }}
          theme="filled"
          onClick={e => this.update({ deleted: true })}
        />
      </div>
    </div>

    const TextUI = <span className="text" onDoubleClick={this.getIntoEditingState}>{this.props.description}</span>

    const todoItemClasses = classNames({
      todoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    })

    return (
      <li className={todoItemClasses}>
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

const mapStateToProps = (state: any, ownProps: any) => ({
	...ownProps
})

const mapDispatchToProps = {
	editingTodo,
	updateTodo
}


export default connect(mapStateToProps,mapDispatchToProps)(todoItem)
