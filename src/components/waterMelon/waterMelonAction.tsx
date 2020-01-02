import React, { Component } from 'react'
import { Button, Icon } from 'antd'

import './waterMelonAction.styl'

interface IWaterMelonActionProps {
  startWaterMelon: () => void
  unFinishedWaterMelons: any[]
}

export class waterMelonAction extends Component<IWaterMelonActionProps, any> {

  constructor(props: IWaterMelonActionProps) {
    super(props)
    this.state = {
      waterMelonList: this.props.unFinishedWaterMelons
    }
  }

  render() {
    console.log(this.state.waterMelonList)

    const NoDataUI = <div className="data-show">
      <Icon className="no-data" type="dropbox"
        style={{
          fontSize: '100px',
          color: '#eee'
        }}
      />
      <p className="no-record">没有记录</p>
    </div>

    const HasDataUI = <ul className="data-show">
      {
        <span>hello world</span>
        // waterMelonList.map(wm => {
        //   console.log(wm)
        // return <li key={wm.id} {...wm}>
        //     <span>{wm.description}</span>
        //     <span>{wm.ended_at}</span>
        //   </li>

        // })
      }
    </ul>


    return (
      <div className="watermelon-action">
        <div className="btn-wrapper">
          <Button className="start-task-btn"
            onClick={this.props.startWaterMelon}
          >开始西瓜</Button>
          <Icon className="icon-close" type="close-circle" style={{
            color: '#bbb',
            cursor: 'pointer'
          }} />
        </div>
        {
          this.state.waterMelonList.length > 0
            ? HasDataUI
            : NoDataUI
        }
      </div>
    )
  }
}

export default waterMelonAction
