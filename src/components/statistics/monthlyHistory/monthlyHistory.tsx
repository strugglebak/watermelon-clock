import React, { Component } from 'react'

import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import { Tabs } from 'antd'

import './monthlyHistory.styl'

const TabPane = Tabs.TabPane

interface IWeeklyHistoryProps {
  todos: any[]
  waterMelons: any[]
}

export class weeklyHistory extends Component
<IWeeklyHistoryProps, any> {
  render() {
    return (
      <Tabs defaultActiveKey="1">
				<TabPane tab="西瓜统计" key="1">
					<div className="weekly-history">
            西瓜
					</div>
				</TabPane>
				<TabPane tab="任务统计" key="2">
					<div className="weekly-history">
            任务
					</div>
				</TabPane>
			</Tabs>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todosReducer,
  waterMelons: state.waterMelonReducer,
  ...ownProps
})

export default connect(mapStateToProps)(weeklyHistory)
