import React, { Component } from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import Todos from '../todos/todos'
import WaterMelon from '../waterMelon/waterMelon'
import Statistics from '../statistics/statistics'

import { connect } from 'react-redux'
import { getUserInfo, initTodos, initWaterMelon } from '../../redux/actions/userActions'

import './home.styl'

interface IIndexState {
  userInfo: any
}

interface IIndexProps {
  userInfo: any
  getUserInfo: () => (dispatch: any) => Promise<any>
  initTodos: () => (dispatch: any) => Promise<any>
  initWaterMelon: () => (dispatch: any) => Promise<any>
}

export class home extends Component<IIndexProps, IIndexState> {

  async componentWillMount() {
    this.props.getUserInfo()
    this.props.initWaterMelon()
    this.props.initTodos()
  }

  render() {
    return (
      <div id="Home">
        <Header userInfo={this.props.userInfo} />
        <main className="content">
          <WaterMelon/>
          <Todos/>
        </main>
        <main className="statistics-content">
          <Statistics/>
        </main>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...state,
  userInfo: state.userReducer.userInfo,
})

const mapDispatchToProps = {
  initTodos,
  initWaterMelon,
  getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(home)
