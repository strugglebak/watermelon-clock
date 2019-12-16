import React, { Component } from 'react'
import Login from '../login/login'
import SignUp from '../signUp/signUp'
import { Button } from 'antd'

interface IRouter {
  history: any
}

export class index extends Component<IRouter, {}> {
  login = () => {
    this.props.history.push('/login')
  }

  signUp = () => {
    this.props.history.push('/signUp')
  }

  render() {
    return (
      <div>
        <Button onClick={this.login}>登录</Button>
        <Button onClick={this.signUp}>注册</Button>
      </div>
    )
  }
}

export default index
