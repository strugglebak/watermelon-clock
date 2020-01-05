import React, { Component } from 'react'
import { Button, Icon, Input, Modal } from 'antd'

import CountDown from './countDown'
import http from '../../config/http'

import './waterMelonAction.styl'

interface IWaterMelonActionProps {
  startWaterMelon: () => void
  updateWaterMelon: (payload: any) => any
  unFinishedWaterMelons: any
}

interface IWaterMelonActionState {
  description: string
  visible: boolean
}


export class waterMelonAction extends Component
<IWaterMelonActionProps, IWaterMelonActionState> {

  constructor(props: IWaterMelonActionProps) {
    super(props)
    this.state = {
      description: '',
      visible: false,
    }
  }

  onEnd = () => {
    this.forceUpdate()
  }

  onKeyUp = (e: any) => {
    const { description } = this.state
    const ended_at = new Date()
    if (e.keyCode === 13 && description !== '') {
      // 更新该西瓜的 description 以及 ended_at aborted
      this.updateWaterMelon({ description, ended_at })
      this.setState({ description: '' })
    }
  }

  abortWaterMelon = () => {
    this.updateWaterMelon({ aborted: true })
    this.setState({ description: '', visible: false })
  }

  updateWaterMelon = async (params: any) => {
    const { id } = this.props.unFinishedWaterMelons
    try {
      const response = await http.put(`/tomatoes/${id}`, params)
      this.props.updateWaterMelon(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  handleOk = (e: any) => {
    this.setState({ visible: false })
  }

  handleCancel = (e: any) => {
    this.setState({ visible: false })
  }

  abort = () => {
    this.setState({ visible: true })
  }

  render() {
    let waterMelon = this.props.unFinishedWaterMelons
    let html = <div/>
    const modal = <Modal
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="放弃西瓜"
      cancelText="取消"
      >
      <h3 style={{
        textAlign: 'center'
      }}>你被什么事情打断了?</h3>
      <Input
        value={this.state.description}
        onChange={e => this.setState({description: e.target.value})}
        onKeyUp={e => this.abortWaterMelon()}
      />
    </Modal>
    const closeIcon = <Icon 
      className="icon-close" type="close-circle" 
      style={{
        color: '#bbb',
        cursor: 'pointer'
      }} 
      onClick={this.abort}
    />

    if (waterMelon === undefined) {
      html = <Button className="start-task-btn" onClick={this.props.startWaterMelon} >开始西瓜</Button>
    } else {
      const startedAtTime = Date.parse(waterMelon.started_at)
      const currentTime = new Date().getTime()
      const deltaTime = currentTime - startedAtTime
      const { duration } = waterMelon

      // 倒计时已到
      if (deltaTime > duration) {
        // 显示 input 框
        html = <div className="input-wrapper">
          <Input
            placeholder="你刚刚完成了什么工作?"
            value={this.state.description}
            onChange={e => this.setState({description: e.target.value})}
            onKeyUp={e => this.onKeyUp(e)}
          />
          {closeIcon}
        </div>
      } else if (deltaTime < duration) {
        // 显示倒计时组件
        const time = duration - (currentTime - startedAtTime)
        html = <div className="count-down-wrapper">
          <CountDown time={time} onEnd={this.onEnd} duration={duration}/>
          {closeIcon}
        </div>
      }
    }

    return (
      <div className="watermelon-action">
        { html }
        { modal }
      </div>
    )
  }
}

export default waterMelonAction
