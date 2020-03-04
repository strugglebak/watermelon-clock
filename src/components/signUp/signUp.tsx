import React, { Component } from 'react'
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import http from '../../config/http'
import { Link } from 'react-router-dom'

import './signUp.styl'

interface ISignUpState {
  account: string
  password: string
  passwordConfirmed: string
}

interface IRouter {
  history: any
}

export class signUp extends Component<IRouter, ISignUpState> {

  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirmed: ''
    }
  }

  onChange = (key: keyof ISignUpState, e: any) => {
    const newState = {} as ISignUpState
    newState[key] = e.target.value
    this.setState(newState)
  }

  goToLogin = () => {
    this.props.history.push('/login')
  }

  submit = async () => {
    const { account, password, passwordConfirmed } = this.state
    try {
      await http.post('/sign_up/user', {
        account, password, password_confirmation: passwordConfirmed
      })

      message.success('注册成功! 3s 后跳转至登录页...')
      setTimeout(() => {
        this.goToLogin()
      }, 3000)

    } catch (e) {
      message.error('注册失败!')
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="page-sign-up">
        <h1 className="sign-up-header">注册</h1>
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
        <Input.Password
          className="password-confirmed-input"
          placeholder="确认密码" allowClear
          prefix={<SafetyCertificateOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={e => {this.onChange('passwordConfirmed', e)}}
        />
        <Button
          className="sign-up-btn"
          type="primary" onClick={this.submit}>
            注册
        </Button>
        <p className="login-link">
          已经有账号？<Link to="/login">立即登录</Link>
        </p>
      </div>
    );
  }
}

export default signUp
