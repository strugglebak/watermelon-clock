import React, { Component } from 'react'
import http from '../../config/http'
import Header from '../header/header'

interface IRouterProps {
  history: any
}

interface IIndexState {
  userInfo: any
}

export class home extends Component<IRouterProps, IIndexState> {

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


  render() {
    return (
      <div>
        <Header
          userInfo={this.state.userInfo}
        />
      </div>
    )
  }
}

export default home
