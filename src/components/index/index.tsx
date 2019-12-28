import React, { Component } from 'react'
import { Button } from 'antd'
import http from '../../config/http'

interface IRouter {
  history: any
}

interface IIndexState {
  userInfo: any
}

export class index extends Component<IRouter, IIndexState> {

  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {}
    }
  }

  async componentWillMount() {
    await this.getUserInfo()
  }

  getUserInfo = async () => {
    try {
      const response = await http.get('/me')
      const userInfo = response.data
      this.setState({ userInfo })
    } catch (e) {
      // console.log(e)
      // message.error('用户登录失败!')
    }
  }

  gotoLogin = () => {
    this.props.history.push('/login')
  }

  logout = () => {
    localStorage.setItem('x-token', '')
    this.gotoLogin()
  }

  render() {
    return (
      <div>
        <h1>欢迎用户 {this.state.userInfo.account} 登录!!!</h1>
        <Button onClick={this.logout}>注销</Button>
      </div>
    )
  }
}

export default index
