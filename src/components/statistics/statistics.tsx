import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import Polyline from './polyline'
import BarChart from './barChart'
import TodosHistory from './todosHistory/todosHistory'
import WaterMelonsHistory from './waterMelonsHistory/waterMelonsHistory'
import MonthlyHistory from './monthlyHistory/monthlyHistory'
import { delegate } from '../../helper/util'
import classNames from 'classnames'

import './statistics.styl'

interface IStatisticsProps {
  todos: any[]
  waterMelons: any[]
}

interface IStatisticsState {
  mapTitleVisible: any
  liWidth: number
}

export class statistics extends Component
<IStatisticsProps, IStatisticsState> {

  constructor(props: IStatisticsProps) {
    super(props)
    this.state = {
      mapTitleVisible: {
       monthlyTitle: { visible: false },
       watermelonTitle: { visible: false },
       todosTitle: { visible: false }
      },
      liWidth: this.liRef.current?.offsetWidth || 0
    }
  }
  ulRef = React.createRef<HTMLUListElement>()
  liRef = React.createRef<HTMLLIElement>()

  updateSize = () => {
    const liWidth = this.liRef.current?.offsetWidth || 0
    this.state.liWidth !== liWidth && (
      this.setState({ liWidth })
    )
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize)
  }
  
  componentDidMount() {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)

    delegate(this.ulRef.current, 'click', 'li', (e: any, el: any) => {
      const { className } = el
      this.setState({
        mapTitleVisible: {...this.initMapVisible(className)}
      })
    })
  }

  initMapVisible = (className: string) => {
    const newClassName = className.split(' ')[0]
    const { mapTitleVisible } = this.state
    const { visible } = mapTitleVisible[newClassName]
    mapTitleVisible[newClassName].visible = !visible
    Object.keys(mapTitleVisible).map(key => {
      return !newClassName.includes(key) && (mapTitleVisible[key].visible = false)
    })
    return mapTitleVisible
  }

  get finishedTodos() { 
    return this.props.todos.filter((todo: any) => todo.completed && !todo.deleted) 
  }

  get finishedWaterMelons() {
     return this.props.waterMelons.filter(
       (wm: any) => 
        wm.description && wm.ended_at && !wm.aborted && !wm.extra?.deleted
     )
  }

  get dailyTodos() {
    // 这里获取到的是当天更新的 todos
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d')
    })
  }

  get dailyWaterMelons() {
    return _.groupBy(this.finishedWaterMelons, (wm: any) => {
      return format(new Date(wm.updated_at), 'yyyy-MM-d')
    })
  }

  get monthlyWaterMelons() {
    const weekData: any[] = [...Array(7)].map(() => [])
    this.finishedWaterMelons.map((wm: any) => {
      const day = new Date(wm.created_at).getDay()
      weekData[day].push(wm)
    })
    return weekData
  }

  get monthlyWaterMelonsLength() {
    return this.finishedWaterMelons.filter(
      wm =>
      new Date(wm.started_at).getMonth()
      ===
      new Date().getMonth()
    ).length
  }


  render() {
    const monthlyTitleClasses = classNames({
      monthlyTitle: true,
      visible: this.state.mapTitleVisible.monthlyTitle.visible
    })

    const watermelonTitleClasses = classNames({
      watermelonTitle: true,
      visible: this.state.mapTitleVisible.watermelonTitle.visible
    })

    const todosTitleClasses = classNames({
      todosTitle: true,
      visible: this.state.mapTitleVisible.todosTitle.visible
    })

    return (
      <>
      <ul className="statistics" ref={this.ulRef}>
        <li className={monthlyTitleClasses} ref={this.liRef}>
          <h3 className="title">统计</h3>
          <div className="description-wrapper">
            <span className="description">
              {new Date().getMonth() + 1}月累计
            </span>
            <span className="number">
              {this.monthlyWaterMelonsLength}
            </span>
          </div>
          <BarChart
            data={this.monthlyWaterMelons}
            finishedCount={this.state.liWidth}
          />
        </li>
        <li className={watermelonTitleClasses}>
          <h3 className="title">西瓜历史</h3>
          <div className="description-wrapper">
            <span className="description">累计完成西瓜</span>
            <span className="number">{this.finishedWaterMelons.length}</span>
          </div>
          <Polyline
            data={this.dailyWaterMelons}
            finishedCount={this.finishedWaterMelons.length}
            width={this.state.liWidth}
          />
        </li>
        <li className={todosTitleClasses}>
          <h3 className="title">任务历史</h3>
          <div className="description-wrapper">
            <span className="description">累计完成任务</span>
            <span className="number">{this.finishedTodos.length}</span>
          </div>
          <Polyline
            data={this.dailyTodos}
            finishedCount={this.finishedTodos.length}
            width={this.state.liWidth}
          />
        </li>
      </ul>
      <div className="history-wrapper">
        <div className={monthlyTitleClasses}>
          <MonthlyHistory/>
        </div>
        <div className={watermelonTitleClasses}>
          <WaterMelonsHistory/>
        </div>
        <div className={todosTitleClasses}>
          <TodosHistory/>
        </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todosReducer,
    waterMelons: state.waterMelonReducer,
    ownProps
})

export default connect(mapStateToProps)(statistics)

