import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { updateTodo } from '../../../redux/actions/todosActions'
import http from '../../../config/http'

import './todosHistoryItem.styl'

interface ITodosHistoryItemProps {
  todo: any
  itemType: string
  updateTodo: (payload: any) => void
}

interface ITodosHistoryItemState {
  restoreText: string
}

export class todosHistoryItem extends Component
<ITodosHistoryItemProps, ITodosHistoryItemState> {

  constructor(props: ITodosHistoryItemProps) {
    super(props);
    this.state = {
      restoreText: '恢复'
    }
  }
  

  update = async (params: any) => {
    this.changeRestoreText('提交中...')
    const {id} = this.props.todo
    try {
      const response = await http.put(`/todos/${id}`, params)
      this.props.updateTodo(response.data.resource)
      this.changeRestoreText('恢复')
    } catch (e) {
      throw new Error(e)
    }
  }

  changeRestoreText = (restoreText: string) => {
    this.setState({ restoreText })
  }

  render() {
    const { updated_at, created_at, description } = this.props.todo
    // 已完成的任务中有 恢复和删除按钮
    const restoreAndDeleteAction = <div className="action">
      <span className="restore" onClick={e => this.update({completed: false})}>
        {this.state.restoreText}
      </span>
      <span onClick={e => this.update({deleted: true})}>删除</span>
    </div>
    // 已删除的任务中有 恢复按钮
    const restoreAction = <div className="action">
      <span className="restore" onClick={e => this.update({deleted: false})}>
        {this.state.restoreText}
      </span>
    </div>
    const mapItemTypeToAction: any = {
      finished: {
        formatText: 'HH:mm',
        time: updated_at,
        action: restoreAndDeleteAction
      },
      deleted: {
        formatText: 'yyyy-MM-dd',
        time: created_at,
        action: restoreAction
      }
    }

    const { 
      formatText,
      time,
      action 
    } = mapItemTypeToAction[this.props.itemType]

    return (
      <div className="todos-history-item">
        <div className="text">
          <span className="time">{format(new Date(time), formatText)}</span>
          <span className="description">{description}</span>
        </div>
        { action }
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = {
  updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(todosHistoryItem)
