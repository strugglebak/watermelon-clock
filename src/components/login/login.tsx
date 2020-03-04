import React, { Component } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import http from '../../config/http'
import { Link } from 'react-router-dom'

import './login.styl'

interface ILoginState {
  account: string
  password: string
}

interface IRouter {
  history: any
}

export class login extends Component<IRouter, ILoginState> {

  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
    }
  }

  onChange = (key: keyof ILoginState, e: any) => {
    const newState = {} as ILoginState
    newState[key] = e.target.value
    this.setState(newState)
  }

  goToSignUp = () => {
    this.props.history.push('/signUp')
  }
  goToIndex = () => {
    this.props.history.push('/')
  }

  submit = async () => {
    const { account, password } = this.state
    try {
      await http.post('/sign_in/user', { account, password })
      this.goToIndex()
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="page-login">
        <h1 className="login-header">登录</h1>
        <Input
          className="account-input"
          placeholder="账号" allowClear
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={e => {this.onChange('account', e)}}
        />
        <Input.Password
          className="password-input"
          placeholder="密码" allowClear
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={e => {this.onChange('password', e)}}
        />
        <Button
          className="login-btn"
          type="primary" onClick={this.submit}>
            登录
        </Button>
        <p className="register-link">
          还没有账号？<Link to="/signUp">立即注册</Link>
        </p>
      </div>
    );
  }
}

export default login
