import React, { Component } from 'react'
import WaterMelonAction from './waterMelonAction'

import './waterMelon.styl'

export class waterMelon extends Component {
  render() {
    return (
      <div className="watermelon">
        <WaterMelonAction/>
      </div>
    )
  }
}

export default waterMelon
