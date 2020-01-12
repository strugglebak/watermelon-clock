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
  editText: string
  deleteText: string
}

export class waterMelonsHistoryItem extends Component 
<IWaterMelonsHistoryItemProps, IWaterMelonsHistoryItemState> {

  constructor(props: IWaterMelonsHistoryItemProps) {
    super(props);
    this.state = {
      editText: '编辑',
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
    if (className === 'edit') {
      submit ? this.changeRestoreText('提交中...') : this.changeRestoreText('编辑')
    } else {
      submit ? this.changeDeleteText('提交中...') : this.changeDeleteText('删除')
    }
  }

  changeRestoreText = (editText: string) => {
    this.setState({ editText })
  }

  changeDeleteText = (deleteText: string) => {
    this.setState({ deleteText })
  }

  render() {
    const { updated_at, created_at, description } = this.props.watermelon
    const { itemType } = this.props
    const action = <div className="action">
      <span className="edit" onClick={e => this.update(e, {completed: false})}>
        {this.state.editText}
      </span>
      <span className="delete" onClick={e => this.update(e, {deleted: true})}>
        {this.state.deleteText}
      </span>
    </div>

    const formatText = 'HH:mm'

    return (
      <div className="watermelons-history-item">
        <div className="text">
          <span className="time">
            {timeTransfer(created_at, formatText, itemType)}
            <span> - </span>
            {timeTransfer(updated_at, formatText, itemType)}
          </span>
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
