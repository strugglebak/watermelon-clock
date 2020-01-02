import React, { Component } from 'react'
import { Icon } from 'antd'

import './countDown.styl'

interface ICountDownProps {
  time: number // 传入的倒计时，单位是 ms
  onEnd: () => void
}

interface ICountDownState {
  countDown: number // 倒计时，单位是 ms
}

let timerId:NodeJS.Timeout

export class countDown extends Component<ICountDownProps, ICountDownState> {

  constructor(props: ICountDownProps) {
    super(props)
    this.state = {
      countDown: this.props.time
    }
  }

  componentDidMount() {
    timerId = setInterval(()=> {
      const time = this.state.countDown
      this.setState({
        countDown: time - 1000
      })

      console.log(time)

      if (time < 1000) {
        window.clearInterval(timerId)
        this.props.onEnd()
      }
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(timerId)
  }

  render() {
    const min = Math.floor(this.state.countDown/1000/60)
    const sec = Math.floor(this.state.countDown/1000%60)
    const time = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
    return (
      <div className="count-down">
        {time}
      </div>
    )
  }
}

export default countDown
