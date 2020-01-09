import React, { Component } from 'react'
import http from '../../config/http'
import Header from '../header/header'
import Todos from '../todos/todos'
import WaterMelon from '../waterMelon/waterMelon'
import Statistics from '../statistics/statistics'

import { connect } from 'react-redux'
import { initTodos } from '../../redux/actions/todosActions'
import { initWaterMelon } from '../../redux/actions/waterMelonActions'

import './home.styl'

interface IIndexState {
  userInfo: any
}

export class home extends Component<any, IIndexState> {

  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {}
    }
  }

  async componentWillMount() {
    await this.getUserInfo()
    await this.getTodos()
    await this.getWaterMelon()
  }

  getUserInfo = async () => {
    try {
      const response = await http.get('/me')
      const userInfo = response.data
      this.setState({ userInfo })
    } catch (e) {
      throw new Error(e)
    }
  }

  getTodos = async () => {
    try {
      const response = await http.get('/todos')
      const { resources } = response.data
      // mount 时需要对每个 todo 的编辑状态置为 false
      const newTodos = resources.map((todo: any) => {
        return Object.assign({}, todo, { editing: false })
      })
      this.props.initTodos(newTodos)
    } catch (e) {
      throw new Error(e)
    }
  }

  getWaterMelon = async () => {
    try {
      const response = await http.get('/tomatoes')
      this.props.initWaterMelon(response.data.resources)
    } catch (e) {
      throw new Error(e)
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
        <main className="statistics-content">
          <Statistics/>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = {
  initTodos,
  initWaterMelon
}

export default connect(mapStateToProps, mapDispatchToProps)(home)
