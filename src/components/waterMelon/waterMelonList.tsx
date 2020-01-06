import React, { Component } from 'react'
import { format } from 'date-fns'

import './waterMelonList.styl'

interface IWaterMelonListProps {
  finishedWaterMelons: any
}

const WaterMelonItem = (props: any) => 
<li className="watermelon-item">
  <span className="time-range">
    {format(new Date(props.started_at), 'H:mm')} - {format(new Date(props.ended_at), 'H:mm')}
  </span>
  <span className="description">{props.description}</span>
</li>

export class waterMelonList extends Component<IWaterMelonListProps, any> {

  get datesKeys() {
    const datesKeys = Object.keys(this.props.finishedWaterMelons)
    return datesKeys
      .sort((a, b) => Date.parse(b) - Date.parse(a))
      .splice(0, 3) // 只需要最近三天的数据
  }

  render() {
    const list = this.datesKeys.map(datesKey => {
      const waterMelons = this.props.finishedWaterMelons[datesKey]
      return (
        <li className="daily-watermelons" key={datesKey}>
          <div className="title">
            <span className="date-time">{format(new Date(datesKey), 'M月dd日')}</span>
            <span className="finished-watermelon-number">完成了 {waterMelons.length} 个西瓜</span>
          </div>
          <ul className="watermelon-list-detail">
            {
              waterMelons.map((wm: any) => <WaterMelonItem key={wm.id} {...wm}/>)
            }
          </ul>
        </li>
      )
    })

    return (
      <ul className="watermelon-list">
        {list}
      </ul>
    )
  }
}

export default waterMelonList
