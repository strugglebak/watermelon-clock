import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import { Tabs, Pagination, Button, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  dayOfWeekTransfer,
  yearMonthDayTransfer
} from '../../../helper/util'
import WaterMelonHistoryItem from './waterMelonsHistoryItem'
import AddNewWaterMelon from './newWaterMelon'

import './waterMelonsHistory.styl'

const TabPane = Tabs.TabPane

interface IWaterMelonsHistoryProps {
  waterMelons: any[]
  addNewWaterMelon: (params: any) => any
}
interface IWaterMelonsHistoryState {
  currentPage: number
  abortedCurrentPage: number
  tabKey: string
  isShowSupplyPane: boolean
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
      abortedCurrentPage: 1,
      tabKey: '1',
      isShowSupplyPane: false
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

  get finishedTodosLength() {
    let length = 0
    Object.keys(this.dailyFinishedWaterMelons).forEach(key => {
      length += this.dailyFinishedWaterMelons[key].length
    })
    return length
  }
  get abortedTodosLength() {
    let length = 0
    Object.keys(this.dailyAbortedWaterMelons).forEach(key => {
      length += this.dailyAbortedWaterMelons[key].length
    })
    return length
  }

  togglePagination = (currentPage: number) => {
    this.setState({currentPage})
  }
  toggleAbortedPagination = (abortedCurrentPage: number) => {
    this.setState({abortedCurrentPage})
  }

  onChangeTab = (tabKey: string) => {
    tabKey !== this.state.tabKey && this.setState({tabKey})
  }

  cancelAddPane = () => {
    this.setState({isShowSupplyPane: false})
  }

  addNewWaterMelon = (params: any) => {
    this.setState({isShowSupplyPane: true})
    this.props.addNewWaterMelon(params)
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

    const operations = this.state.tabKey === '1'
      ? (
        <Tooltip title="补记西瓜">
          <Button className="supply-watermelon"
            icon={<PlusOutlined />}
            onClick={() => this.setState({isShowSupplyPane: true})}
          />
        </Tooltip>
      )
      : null

    return (
      <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={operations}
        onChange={this.onChangeTab}
      >
				<TabPane tab="完成的西瓜" key="1">
          {
            this.state.isShowSupplyPane
              ? <AddNewWaterMelon
                cancelAddPane={this.cancelAddPane}
                addNewWaterMelon={this.addNewWaterMelon}
              />
              : null
          }
					<div className="watermelons-history">
						{finishedWaterMelonsList}
					</div>
          <div className="tab-pane-page-footer">
            <Pagination defaultCurrent={1}
              pageSize={3} // 每页显示3条数据，可以与上面的 currentPage*3 对应上
              hideOnSinglePage={true}
              total={Object.keys(this.dailyFinishedWaterMelons).length}
              current={this.state.currentPage}
              onChange={this.togglePagination}
            />
            <div></div>
            <p className="total-num-of-todos">总计 {this.finishedTodosLength} 个已完成的任务</p>
          </div>
				</TabPane>
				<TabPane tab="打断记录" key="2">
					<div className="watermelons-history">
						{abortedWaterMelonsList}
					</div>
          <div className="tab-pane-page-footer">
            <Pagination defaultCurrent={1}
              pageSize={3}
              hideOnSinglePage={true}
              total={Object.keys(this.abortedWaterMelons).length}
              current={this.state.abortedCurrentPage}
              onChange={this.toggleAbortedPagination}
            />
            <div></div>
            <p className="total-num-of-todos">总计 {this.abortedTodosLength} 个打断的任务</p>
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
