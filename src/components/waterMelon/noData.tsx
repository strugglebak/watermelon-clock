import React, { Component } from 'react'
import { DropboxOutlined } from '@ant-design/icons';

import './noData.styl'

export class noData extends Component {
  render() {
    return (
      <div className="no-data">
        <DropboxOutlined
          className="no-data"
          style={{
            fontSize: '100px',
            color: '#eee'
          }} />
        <p className="no-record">没有记录</p>
      </div>
    );
  }
}

export default noData
