import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import { Tabs } from 'antd'
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

export class waterMelonsHistory extends Component 
<IWaterMelonsHistoryProps, any> {

  get finishedWaterMelons() {
     return this.props.waterMelons.filter((wm: any) => wm.description && wm.ended_at && !wm.aborted)
  }

  get deletedaWaterMelons() {
    return this.props.waterMelons.filter((wm: any) => wm.extra && wm.extra.deleted)
  }

  get dailyFinishedWaterMelons() {
    // 这里按照 x年x月x日 的形式排列数据
    return _.groupBy(this.finishedWaterMelons, (wm: any) => {
      return format(new Date(wm.started_at), 'yyyy-M-d')
    })
  }

  get finishedDatesKeys() {
    return Object.keys(this.dailyFinishedWaterMelons).sort(
      // 倒序排列
      (a, b) => Date.parse(b) - Date.parse(a)
    )
  }

  render() {
    const finishedWaterMelonsList = this.finishedDatesKeys.map(
      (datesKey: any) => {
        const watermelons = this.dailyFinishedWaterMelons[datesKey]
        return (
          <div className="daily-watermelons" key={datesKey}>

            <div className="summary">
              <div className="date-wrapper">
                <p className="date">
                  <span className="year-month-day">{yearMonthDayTransfer(datesKey)}</span>
                  <span className="day">{dayOfWeekTransfer(datesKey)}</span>
                </p>
                <p className="finished-watermelons-count">完成了 {watermelons.length} 个西瓜</p>
              </div>
            </div>

            <div className="watermelons-list">
              {
                watermelons.map(
                  (wm: any) => 
                    <WaterMelonHistoryItem
                      key={wm.id}
                      watermelon={wm}
                      itemType="finished"
                    />
                )
              }
            </div>
          </div>
        )
      }
    )

    const deletedWaterMelonsList = this.deletedaWaterMelons.map(
      (wm: any) => 
        <WaterMelonHistoryItem
          key={wm.id}
          watermelon={wm}
          itemType="deleted"
        />
    )

    return (
      <Tabs defaultActiveKey="1">
				<TabPane tab="已完成的任务" key="1">
					<div className="watermelons-history">
						{finishedWaterMelonsList}
					</div>
				</TabPane>
				<TabPane tab="已删除的任务" key="2">
					<div className="watermelons-history">
						{deletedWaterMelonsList}
					</div>
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
