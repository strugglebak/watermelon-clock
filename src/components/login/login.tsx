import React, { Component } from 'react'
import { Input, Button, Icon } from 'antd'

export class login extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
    }
  }

  onAccountInputChange = (e: any) => {
    const account = e.target.value
    this.setState({ account })
  }
  onPasswordInputChange = (e: any) => {
    const password = e.target.value
    this.setState({ password })
  }

  render() {
    return (
      <>
        <h1>登录</h1>
        <Input
          placeholder="请输入账号" allowClear
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={this.onAccountInputChange}
        />
        <Input.Password placeholder="请输入密码" allowClear
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={this.onPasswordInputChange}
        />
        <Button type="primary">登录</Button>
      </>
    )
  }
}

export default login
