import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateWaterMelon } from '../../../redux/actions/waterMelonActions'
import http from '../../../config/http'
import { timeTransfer } from '../../../helper/util'

import './waterMelonsHistoryItem.styl'

interface IWaterMelonsHistoryItemProps {
  watermelon: any
  itemType: string
  updateWaterMelon: (payload: any) => void
}

interface IWaterMelonsHistoryItemState {
  restoreText: string
  deleteText: string
}

export class waterMelonsHistoryItem extends Component 
<IWaterMelonsHistoryItemProps, IWaterMelonsHistoryItemState> {

  constructor(props: IWaterMelonsHistoryItemProps) {
    super(props);
    this.state = {
      restoreText: '恢复',
      deleteText: '删除'
    }
  }

  update = async (e: any, params: any) => {
    const {id} = this.props.watermelon
    const {className} = e.currentTarget
    this.changeActionText({submit: true, className})
    try {
      const response = await http.put(`/tomatoes/${id}`, params)
      this.props.updateWaterMelon(response.data.resource)
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

  render() {
    const { updated_at, created_at, description } = this.props.watermelon
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
      <div className="watermelons-history-item">
        <div className="text">
          <span className="time">{timeTransfer(time, formatText, itemType)}</span>
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
  updateWaterMelon
}

export default connect(mapStateToProps, mapDispatchToProps)(waterMelonsHistoryItem)
