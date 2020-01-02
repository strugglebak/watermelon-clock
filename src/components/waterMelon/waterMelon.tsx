import React, { Component } from 'react'
import WaterMelonAction from './waterMelonAction'

import { connect } from 'react-redux'
import { initWaterMelon, addWaterMelon } from '../../redux/actions/waterMelonActions'

import http from '../../config/http'

import './waterMelon.styl'

interface IWaterMelonProps {
  initWaterMelon: (payload: any[]) => any
  addWaterMelon: (payload: any) => any
  waterMelons: any[]
}

export class waterMelon extends Component<IWaterMelonProps, any> {

  constructor(props: IWaterMelonProps) {
    super(props)
  }

  get unFinishedWaterMelons() {
    return this.props.waterMelons.filter(wm => !wm.description && !wm.ended_at)[0]
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
    try {
      const response = await http.post('/tomatoes', {
        duration: 1500000 // 25min = 25 * 60 * 1000ms
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
          unFinishedWaterMelons={this.unFinishedWaterMelons}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
	waterMelons: state.waterMelonReducer,
	...ownProps
})

const mapDispatchToProps = {
	initWaterMelon,
	addWaterMelon
}

export default connect(mapStateToProps,mapDispatchToProps)(waterMelon)
