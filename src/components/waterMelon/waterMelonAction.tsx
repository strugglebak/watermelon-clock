import React, { Component } from 'react'
import { Button, Icon } from 'antd'

import './waterMelonAction.styl'

export class waterMelonAction extends Component {
  render() {
    return (
      <div className="watermelon-action">
        <div className="btn-wrapper">
          <Button className="start-task-btn">开始西瓜</Button>
          <Icon className="icon-close" type="close-circle" style={{
            color: '#bbb',
            cursor: 'pointer'
          }} />
        </div>
        <div className="data-show">
          <Icon className="no-data" type="dropbox"
            style={{
              fontSize: '100px',
              color: '#eee'
            }}
          />
          <p className="no-record">没有记录</p>
        </div>
      </div>
    )
  }
}

export default waterMelonAction
