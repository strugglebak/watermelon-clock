import React, { Component } from 'react'
import { Button, Icon, Input } from 'antd'

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
}

export class waterMelonAction extends Component
<IWaterMelonActionProps, IWaterMelonActionState> {

  constructor(props: IWaterMelonActionProps) {
    super(props)
    this.state = {
      description: ''
    }
  }

  onEnd = () => {
    console.log('exec end')
    this.render()
  }

  onKeyUp = (e: any) => {
    const { description } = this.state
    const ended_at = new Date()
    if (e.keyCode === 13 && description !== '') {
      // 更新该西瓜的 description 以及 ended_at
      this.updateDescription({ description, ended_at })
      this.setState({ description: '' })
    }
  }

  updateDescription = async (params: any) => {
    const { id } = this.props.unFinishedWaterMelons
    try {
      const response = await http.put(`/tomatoes/${id}`, params)
      this.props.updateWaterMelon(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    let waterMelon = this.props.unFinishedWaterMelons
    let html = <div/>

    if (waterMelon === undefined) {
      console.log('显示 button')
      html = <Button className="start-task-btn" onClick={this.props.startWaterMelon} >开始西瓜</Button>
    } else {
      const startedAtTime = Date.parse(waterMelon.started_at)
      const currentTime = new Date().getTime()
      const deltaTime = currentTime - startedAtTime
      const { duration } = waterMelon

      // 倒计时已到
      if (deltaTime > duration) {
        console.log('显示 input')
        // 显示 input 框
        html = <div className="input-wrapper">
            <Input
              placeholder="你刚刚完成了什么工作?"
              value={this.state.description}
              onChange={e => this.setState({description: e.target.value})}
              onKeyUp={e => this.onKeyUp(e)}
            />
            <Icon className="icon-close" type="close-circle" style={{
              color: '#bbb',
              cursor: 'pointer'
            }} />
        </div>
      } else if (deltaTime < duration) {
        console.log('显示 倒计时')
        // 显示倒计时组件
        const time = duration - (currentTime - startedAtTime)
        console.log(duration, currentTime, startedAtTime)
        console.log(time)
        html = <div className="count-down-wrapper">
          <CountDown time={time} onEnd={this.onEnd}/>
          <Icon className="icon-close" type="close-circle" style={{
            color: '#bbb',
            cursor: 'pointer'
          }} />
        </div>
      }
    }

    console.log('开始渲染 html', html)
    return (
      <div className="watermelon-action">
        { html }
      </div>
    )
  }
}

export default waterMelonAction
