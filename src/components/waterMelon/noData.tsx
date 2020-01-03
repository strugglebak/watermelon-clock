import React, { Component } from 'react'
import { Icon } from 'antd'

import './noData.styl'

export class noData extends Component {
  render() {
    return (
      <div className="no-data">
        <Icon className="no-data" type="dropbox"
          style={{
            fontSize: '100px',
            color: '#eee'
          }}
        />
        <p className="no-record">没有记录</p>
      </div>
    )
  }
}

export default noData
