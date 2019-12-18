import React, { Component } from 'react'
import { Input, Button, Icon } from 'antd'

export class signUp extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirmed: ''
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
  onPasswordConfirmedInputChange = (e: any) => {
    const passwordConfirmed = e.target.value
    this.setState({ passwordConfirmed })
  }

  render() {
    return (
      <>
        <h1>注册</h1>
        <Input
          placeholder="请输入账号" allowClear
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={this.onAccountInputChange}
        />
        <Input.Password placeholder="请输入密码" allowClear
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={this.onPasswordInputChange}
        />
        <Input.Password placeholder="确认密码" allowClear
          prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={this.onPasswordConfirmedInputChange}
        />
        <Button type="primary">注册</Button>
      </>
    )
  }
}

export default signUp
