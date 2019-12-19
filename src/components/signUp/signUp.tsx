import React, { Component } from 'react'
import { Input, Button, Icon, message } from 'antd'
import http from '../../config/http'
import { Link } from 'react-router-dom'

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
      <>
        <h1>注册</h1>
        <Input
          placeholder="账号" allowClear
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={e => {this.onChange('account', e)}}
        />
        <Input.Password placeholder="密码" allowClear
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={e => {this.onChange('password', e)}}
        />
        <Input.Password placeholder="确认密码" allowClear
          prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={e => {this.onChange('passwordConfirmed', e)}}
        />
        <Button type="primary" onClick={this.submit}>注册</Button>
        <br/>
        Or 已经有账号？<Link to="/login">立即登录</Link>
      </>
    )
  }
}

export default signUp
