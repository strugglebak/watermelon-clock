import React, { Component } from 'react'
import http from '../../config/http'
import Header from '../header/header'
import Todos from '../todos/todos'
import WaterMelon from '../waterMelon/waterMelon'

import './home.styl'

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
      <div id="Home">
        <Header userInfo={this.state.userInfo} />
        <main className="content">
          <WaterMelon/>
          <Todos/>
        </main>
      </div>
    )
  }
}

export default home
