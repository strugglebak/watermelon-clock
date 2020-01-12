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
<IWaterMelonsHistoryProps, any> {

  get finishedWaterMelons() {
     return this.props.waterMelons.filter((wm: any) => wm.description && wm.ended_at && !wm.aborted)
  }

  get abortedWaterMelons() {
    return this.props.waterMelons.filter((wm: any) => wm.aborted)
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
        const Props = { datesKey, watermelons, itemType: 'finished' }
        const Slot = <p className="finished-watermelons-count">完成了 {watermelons.length} 个西瓜</p>
        return List(Props, Slot)
      }
    )

    const abortedWaterMelonsList = this.finishedDatesKeys.map(
      (datesKey: any) => {
        const watermelons = this.abortedWaterMelons
        const Props = { datesKey, watermelons, itemType: 'aborted'}
        return List(Props)
      }
    )

    return (
      <Tabs defaultActiveKey="1">
				<TabPane tab="完成的西瓜" key="1">
					<div className="watermelons-history">
						{finishedWaterMelonsList}
					</div>
				</TabPane>
				<TabPane tab="打断记录" key="2">
					<div className="watermelons-history">
						{abortedWaterMelonsList}
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
