import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import history from '../../config/history'

import './header.styl'

interface IHeaderProps {
  userInfo: any
}

const gotoLogin = () => {
  history.push('/login')
}

const logout = () => {
  console.log(111)
  localStorage.setItem('x-token', '')
  gotoLogin()
}

const menu = (
  <Menu>
    <Menu.Item key="0"><Icon type="user" />个人设置</Menu.Item>
    <Menu.Item key="1" onClick={logout}><Icon type="logout"/>登出</Menu.Item>
  </Menu>
)

export class header extends Component<IHeaderProps> {

  render() {
    return (
      <div className="page-header page-container">
        <h1 className="logo">
          <a href="/">西瓜闹钟</a>
        </h1>
        <Dropdown overlay={menu} trigger={['click']}>
          <span className="dropdown-title">
            {
              this.props.userInfo && this.props.userInfo.account
            }
            <Icon type="down" className="icon-down" />
          </span>
        </Dropdown>
      </div>
    )
  }
}

export default header
