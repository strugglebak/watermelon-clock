import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import Polyline from './polyline'
import BarChart from './barChart'
import TodosHistory from './todosHistory/todosHistory'
import WaterMelonsHistory from './waterMelonsHistory/waterMelonsHistory'
import WeeklyHistory from './weeklyHistory/weeklyHistroy'
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
       weeklyTitle: { visible: false },
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

  get weeklyWaterMelons() {
    const weekData: any[] = [...Array(7)].map(() => [])
    this.finishedWaterMelons.map((wm: any) => {
      const day = new Date(wm.created_at).getDay()
      weekData[day].push(wm)
    })
    return weekData
  }

  get monthlyWaterMelons() {
    return this.finishedWaterMelons.filter(
      wm =>
      new Date(wm.started_at).getMonth()
      ===
      new Date().getMonth()
    ).length
  }


  render() {
    const weeklyTitleClasses = classNames({
      weeklyTitle: true,
      visible: this.state.mapTitleVisible.weeklyTitle.visible
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
        <li className={weeklyTitleClasses} ref={this.liRef}>
          <h3 className="title">统计</h3>
          <p className="description">
            {new Date().getMonth() + 1}月累计
          </p>
          <span className="number">
            {this.monthlyWaterMelons}
          </span>
          <BarChart
            data={this.weeklyWaterMelons}
            finishedCount={this.state.liWidth}
          />
        </li>
        <li className={watermelonTitleClasses}>
          <h3 className="title">西瓜历史</h3>
          <p className="description">累计完成西瓜</p>
          <span className="number">{this.finishedWaterMelons.length}</span>
          <Polyline
            data={this.dailyWaterMelons}
            finishedCount={this.finishedWaterMelons.length}
          />
        </li>
        <li className={todosTitleClasses}>
          <h3 className="title">任务历史</h3>
          <p className="description">累计完成任务</p>
          <span className="number">{this.finishedTodos.length}</span>
          <Polyline
            data={this.dailyTodos}
            finishedCount={this.finishedTodos.length}
          />
        </li>
      </ul>
      <div className="history-wrapper">
        <div className={weeklyTitleClasses}>
          <WeeklyHistory/>
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

