import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import { Tabs, Pagination } from 'antd'
import {
  dayOfWeekTransfer,
  yearMonthDayTransfer
} from '../../../helper/util'
import WaterMelonHistoryItem from './waterMelonsHistoryItem'

import './waterMelonsHistory.styl'

const TabPane = Tabs.TabPane

interface IWaterMelonsHistoryProps {
  waterMelons: any[]
}
interface IWaterMelonsHistoryState {
  currentPage: number
  abortedCurrentPage: number
}

const List = (Props: any, Slot?: any) => {
  const { datesKey, watermelons, itemType } = Props
  return (
    <div className="daily-watermelons" key={datesKey}>

      <div className="summary">
        <div className="date-wrapper">
          <p className="date">
            <span className="year-month-day">{yearMonthDayTransfer(datesKey)}</span>
            <span className="day">{dayOfWeekTransfer(datesKey)}</span>
          </p>
          {Slot || ''}
        </div>
      </div>

      <div className="watermelons-list">
        {
          watermelons.map(
            (wm: any) =>
              <WaterMelonHistoryItem
                key={wm.id}
                watermelon={wm}
                itemType={itemType}
              />
          )
        }
      </div>
    </div>
  )
}

export class waterMelonsHistory extends Component
<IWaterMelonsHistoryProps, IWaterMelonsHistoryState> {
  constructor(props: IWaterMelonsHistoryProps) {
    super(props)
    this.state = {
      currentPage: 1,
      abortedCurrentPage: 1
    }
  }

  get finishedWaterMelons() {
     return this.props.waterMelons.filter(
       (wm: any) =>
        wm.description && wm.ended_at && !wm.aborted && !wm?.extra?.deleted
     )
  }

  get abortedWaterMelons() {
    return this.props.waterMelons.filter((wm: any) => wm.aborted && !wm?.extra?.deleted)
  }

  get dailyFinishedWaterMelons() {
    return _.groupBy(this.finishedWaterMelons, (wm: any) => {
      return format(new Date(wm.started_at), 'yyyy-M-d')
    })
  }

  get dailyAbortedWaterMelons() {
    return _.groupBy(this.abortedWaterMelons, (wm: any) => {
      return format(new Date(wm.started_at), 'yyyy-M-d')
    })
  }

  get finishedDatesKeys() {
    const {currentPage} = this.state
    return Object.keys(this.dailyFinishedWaterMelons)
    .sort(
      (a, b) => Date.parse(b) - Date.parse(a)
    )
    .slice((currentPage-1)*3, currentPage*3) // 分页逻辑
  }

  get abortedDatesKeys() {
    const {abortedCurrentPage} = this.state
    return Object.keys(this.dailyAbortedWaterMelons)
    .sort(
      (a, b) => Date.parse(b) - Date.parse(a)
    )
    .slice((abortedCurrentPage-1)*3, abortedCurrentPage*3) // 分页逻辑
  }

  togglePagination = (currentPage: number) => {
    this.setState({currentPage})
  }
  toggleAbortedPagination = (abortedCurrentPage: number) => {
    this.setState({abortedCurrentPage})
  }

  render() {
    const finishedWaterMelonsList = this.finishedDatesKeys.map(
      (datesKey: any) => {
        const watermelons = this.dailyFinishedWaterMelons[datesKey]
        const Props = { datesKey, watermelons, itemType: 'finished' }
        const Slot = <p className="finished-watermelons-count">完成了 {watermelons.length} 个西瓜</p>
        return List(Props, Slot)
      }
    )

    const abortedWaterMelonsList = this.abortedDatesKeys.map(
      (datesKey: any) => {
        const watermelons = this.dailyAbortedWaterMelons[datesKey]
        const Props = { datesKey, watermelons, itemType: 'aborted' }
        return List(Props)
      }
    )

    return (
      <Tabs defaultActiveKey="1" type="card">
				<TabPane tab="完成的西瓜" key="1">
					<div className="watermelons-history">
						{finishedWaterMelonsList}
					</div>
          <Pagination defaultCurrent={1}
            pageSize={3}
            hideOnSinglePage={true}
            total={Object.keys(this.dailyFinishedWaterMelons).length}
            current={this.state.currentPage}
            onChange={this.togglePagination}
          />
				</TabPane>
				<TabPane tab="打断记录" key="2">
					<div className="watermelons-history">
						{abortedWaterMelonsList}
					</div>
          <Pagination defaultCurrent={1}
            pageSize={3}
            hideOnSinglePage={true}
            total={Object.keys(this.abortedWaterMelons).length}
            current={this.state.abortedCurrentPage}
            onChange={this.toggleAbortedPagination}
          />
				</TabPane>
			</Tabs>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  waterMelons: state.waterMelonReducer,
  ...ownProps
})

export default connect(mapStateToProps)(waterMelonsHistory)
