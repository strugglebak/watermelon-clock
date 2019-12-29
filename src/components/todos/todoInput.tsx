import React, { Component } from 'react'
import { Input, Icon } from 'antd'

interface ITodoInputState {
  description: string
  focus: boolean
}

interface ITodoInputProps {
  addTodo: (params: any) => void
}

export class todoInput extends Component<ITodoInputProps, ITodoInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: '',
      focus: false
    }
  }

  // 获得焦点
  onFocus = (e: any) => {
    this.setState({ focus: true })
  }

  // 失去焦点
  onBlur = (e: any) => {
    this.setState({ focus: false })
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addTodo()
      this.setState({description: ''})
    }
  }

  onChange = (e: any) => {
    this.setState({
      description: e.target.value
    })
  }

  addTodo = () => {
    const { description } = this.state
    this.props.addTodo({ description })
  }

  render() {
    const { focus, description } = this.state
    const suffix = description
      ? <Icon type="enter" style={{
          fontSize: '18px', cursor: 'pointer'
        }}
        onClick={this.addTodo}
        />
      : <span/>
    return (
      <div className="todo-input">
        <Input placeholder="添加新任务"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          value={this.state.description}
          suffix={suffix}
        />
      </div>
    )
  }
}

export default todoInput
