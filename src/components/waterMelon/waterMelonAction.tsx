import React, { Component } from 'react'
import { Button, Icon } from 'antd'

import CountDown from './countDown'

import './waterMelonAction.styl'

interface IWaterMelonActionProps {
  startWaterMelon: () => void
  unFinishedWaterMelons: any
}

export class waterMelonAction extends Component<IWaterMelonActionProps, any> {

  constructor(props: IWaterMelonActionProps) {
    super(props)
  }

  onEnd = () => {
    this.render()
  }

  render() {
    let waterMelonList = this.props.unFinishedWaterMelons
    let NoDataUI, HasDataUI, html
    if (waterMelonList === undefined) {
      html = <div className="btn-wrapper">
        <Button className="start-task-btn" onClick={this.props.startWaterMelon} >开始西瓜</Button>
      </div>
      NoDataUI = <div className="data-show">
        <Icon className="no-data" type="dropbox"
          style={{
            fontSize: '100px',
            color: '#eee'
          }}
        />
        <p className="no-record">没有记录</p>
      </div>
    } else {
      html = <CountDown time={15000} onEnd={this.onEnd}/>
      HasDataUI = <ul className="data-show">
        {
          waterMelonList.map((wm: any) =>
           <li key={wm.id} {...wm}>
              <span>hello world</span>
              <span>{wm.description}</span>
              <span>{wm.ended_at}</span>
            </li>
          )
        }
      </ul>
    }

    return (
      <div className="watermelon-action">
        { html }
        {
          waterMelonList?.length > 0 ? HasDataUI : NoDataUI
        }
      </div>
    )
  }
}

export default waterMelonAction
