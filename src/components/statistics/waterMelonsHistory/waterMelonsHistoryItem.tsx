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
  editable: boolean
  editingText: string
}

export class waterMelonsHistoryItem extends Component 
<IWaterMelonsHistoryItemProps, IWaterMelonsHistoryItemState> {

  constructor(props: IWaterMelonsHistoryItemProps) {
    super(props);
    this.state = {
      editText: '编辑',
      deleteText: '删除',
      editable: false,
      editingText: this.props.watermelon.description
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
      submit ? this.changeEditText('提交中...') : this.changeEditText('编辑')
    } else {
      submit ? this.changeDeleteText('提交中...') : this.changeDeleteText('删除')
    }
  }

  changeEditText = (editText: string) => {
    this.setState({ editText })
  }

  changeDeleteText = (deleteText: string) => {
    this.setState({ deleteText })
  }

  onEditClick = (e: any) => {
    const { description } = this.props.watermelon
    this.setState({ editable: true, editingText: description })
    this.changeEditText('提交')
    this.changeDeleteText('取消')
  }

  onDeleteClick = (e: any) => {
    this.setState({ editable: false })
    this.update(e, {
      extra: {deleted: true}
    })
  }

  onSubmitClick = (e: any) => {
    this.setState({ editable: false })
    this.update(e, {
      description: this.state.editingText,
      aborted: this.props.itemType === 'aborted'
    })
    this.changeEditText('编辑')
    this.changeDeleteText('删除')
  }

  onCancelClick = (e: any) => {
    this.setState({ editable: false })
    this.changeEditText('编辑')
    this.changeDeleteText('删除')
  }

  onEditingChange = (e: any) => {
    // 先触发 resize 后触发 render
    // 避免两次渲染造成的内容抖动
    this.resize()
    this.setState({ editingText: e.target.value })
    if (e.keyCode === 13 && this.state.editingText !== '') {
      this.update(e, {
        description: this.state.editingText,
        aborted: this.props.itemType === 'aborted'
      })
    }
  }

  // textarea resize 参考
  // https://www.jianshu.com/p/2fab017977bb
  resize = ()=> {
    if (this.inputRef) {
      const { current } = this.inputRef
      const { style } = current as any
      style!.height = 'auto'
      style!.height = (current!.scrollHeight) + 'px'
    }
  }

  inputRef = React.createRef<HTMLTextAreaElement>()

  render() {
    const { updated_at, created_at, description } = this.props.watermelon
    const { itemType } = this.props
    const formatText = 'HH:mm'

    const normalDescription = <span 
      className="description">
      {description}
    </span>
    const inputDescripiton = <textarea 
      ref={this.inputRef}
      rows={1} cols={30}
      className="editing-input" 
      value={this.state.editingText}
      onChange={e => this.onEditingChange(e)}
    />

    const normalAction = <div className="action">
      <span className="edit" onClick={e => this.onEditClick(e)}>
        {this.state.editText}
      </span>
      <span className="delete" onClick={e => this.onDeleteClick(e)}>
        {this.state.deleteText}
      </span>
    </div>

    const inputAction = <div className="action">
      <span className="submit" onClick={e => this.onSubmitClick(e)}>
        {this.state.editText}
      </span>
      <span className="cancel" onClick={e => this.onCancelClick(e)}>
        {this.state.deleteText}
      </span>
    </div>

    const Descripiton = this.state.editable ? inputDescripiton : normalDescription
    const Action = this.state.editable ? inputAction : normalAction

    return (
      <div className="watermelons-history-item">
        <div className="text">
          <p className="time">
            {timeTransfer(created_at, formatText, itemType)}
            <span> - </span>
            {timeTransfer(updated_at, formatText, itemType)}
          </p>
          { Descripiton }
        </div>
        { Action }
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
