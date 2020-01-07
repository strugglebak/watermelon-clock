import React, { Component } from 'react'
import WaterMelonAction from './waterMelonAction'
import WaterMelonList from './waterMelonList'

import { connect } from 'react-redux'
import {
  initWaterMelon,
  addWaterMelon,
  updateWaterMelon
} from '../../redux/actions/waterMelonActions'

import http from '../../config/http'

import _ from 'lodash'
import { format } from 'date-fns'

import './waterMelon.styl'

interface IWaterMelonProps {
  initWaterMelon: (payload: any[]) => any
  addWaterMelon: (payload: any) => any
  updateWaterMelon: (payload: any) => void
  waterMelons: any[]
}

export class waterMelon extends Component<IWaterMelonProps, any> {

  get unFinishedWaterMelon() {
    // description 以及 ended_at 为 null 的就是刚刚开始的西瓜任务
    // 点击了开始西瓜之后，会出现倒计时，此时该西瓜的 description 和 ended_at 为 null
    // 当 input 出现时，提交信息后会修改该西瓜的 description 以及 ended_at
    return this.props.waterMelons.filter(wm => !wm.description && !wm.ended_at && !wm.aborted)[0]
  }

  get finishedWaterMelons() {
    const finishedWaterMelons = this.props.waterMelons.filter(wm => wm.description && wm.ended_at && !wm.aborted)
    // // 这里按照 x年x月x日 的形式排列数据
    return _.groupBy(finishedWaterMelons, (wm: any) => {
      return format(new Date(wm.started_at), 'yyyy-M-d')
    })
  }

  componentDidMount() {
    this.getWaterMelonList()
  }

  getWaterMelonList = async () => {
    try {
      const response = await http.get('/tomatoes')
      this.props.initWaterMelon(response.data.resources)
    } catch (e) {
      throw new Error(e)
    }
  }

  startWaterMelon = async () => {
    console.log('start watermelon')
    try {
      const response = await http.post('/tomatoes', {
        duration: 1500000 // 25min = 25 * 60 * 1000ms
        // duration: 10000 // test 10s
      })
      this.props.addWaterMelon(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="watermelon">
        <WaterMelonAction
          startWaterMelon={this.startWaterMelon}
          unFinishedWaterMelon={this.unFinishedWaterMelon}
          updateWaterMelon={this.props.updateWaterMelon}
        />
        <WaterMelonList
          finishedWaterMelons={this.finishedWaterMelons}
        />       
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    waterMelons: state.waterMelonReducer,
    ...ownProps
  }
}

const mapDispatchToProps = {
	initWaterMelon,
  addWaterMelon,
  updateWaterMelon
}

export default connect(mapStateToProps,mapDispatchToProps)(waterMelon)