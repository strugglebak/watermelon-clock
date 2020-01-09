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
  deleteText: string
}

export class todosHistoryItem extends Component
<ITodosHistoryItemProps, ITodosHistoryItemState> {

  constructor(props: ITodosHistoryItemProps) {
    super(props);
    this.state = {
      restoreText: '恢复',
      deleteText: '删除'
    }
  }

  update = async (e: any, params: any) => {
    const {id} = this.props.todo
    const {className} = e.currentTarget
    this.changeActionText({submit: true, className})
    try {
      const response = await http.put(`/todos/${id}`, params)
      this.props.updateTodo(response.data.resource)
      this.changeActionText({submit: false, className})
    } catch (e) {
      throw new Error(e)
    }
  }

  changeActionText = (params: any) => {
    const { submit, className } = params
    if (className === 'restore') {
      submit ? this.changeRestoreText('提交中...') : this.changeRestoreText('恢复')
    } else {
      submit ? this.changeDeleteText('提交中...') : this.changeDeleteText('删除')
    }
  }

  changeRestoreText = (restoreText: string) => {
    this.setState({ restoreText })
  }

  changeDeleteText = (deleteText: string) => {
    this.setState({ deleteText })
  }

  timeTransfer = (time: string, formatText: string, itemType: string) => {
    const formatedTime = format(new Date(time), formatText)
    const arr = formatedTime.split('-')
    const str = itemType === 'finished'
      ? formatedTime
      : `${arr[0]}月${arr[1]}日`
    return str
  }

  render() {
    const { updated_at, created_at, description } = this.props.todo
    const { itemType } = this.props
    // 已完成的任务中有 恢复和删除按钮
    const restoreAndDeleteAction = <div className="action">
      <span className="restore" onClick={e => this.update(e, {completed: false})}>
        {this.state.restoreText}
      </span>
      <span className="delete" onClick={e => this.update(e, {deleted: true})}>
        {this.state.deleteText}
      </span>
    </div>
    // 已删除的任务中有 恢复按钮
    const restoreAction = <div className="action">
      <span className="restore" onClick={e => this.update(e, {deleted: false})}>
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
        formatText: 'MM-dd',
        time: created_at,
        action: restoreAction
      }
    }

    const { 
      formatText,
      time,
      action 
    } = mapItemTypeToAction[itemType]

    return (
      <div className="todos-history-item">
        <div className="text">
          <span className="time">{this.timeTransfer(time, formatText, itemType)}</span>
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
