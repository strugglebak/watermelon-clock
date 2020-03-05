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
import {
  addWaterMelon,
  updateWaterMelon
} from '../../../redux/actions/waterMelonActions'

import './waterMelonsHistory.styl'

const TabPane = Tabs.TabPane

interface IWaterMelonsHistoryProps {
  waterMelons: any[]
  addWaterMelon: (payload: any) => any
  updateWaterMelon: (payload: any) => any
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
    this.props.addWaterMelon(params)
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
          <Pagination defaultCurrent={1}
            pageSize={3} // 每页显示3条数据，可以与上面的 currentPage*3 对应上
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

const mapDispatchToProps = {
  addWaterMelon,
  updateWaterMelon
}

export default connect(mapStateToProps, mapDispatchToProps)(waterMelonsHistory)
