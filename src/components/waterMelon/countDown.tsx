import React, { Component } from 'react'

import './countDown.styl'

interface ICountDownProps {
  time: number // 传入的倒计时，单位是 ms
  onEnd: () => void
}

interface ICountDownState {
  countDown: number // 倒计时，单位是 ms
}

let timerId:NodeJS.Timeout

const delayTime = 2000 // 2s 延时

export class countDown extends Component<ICountDownProps, ICountDownState> {

  constructor(props: ICountDownProps) {
    super(props)
    this.state = {
      countDown: this.props.time
    }
  }

  get countDown() {
    const { countDown } = this.state
    const time = countDown + delayTime
    const min = Math.floor(time/1000/60)
    const sec = Math.floor(time/1000%60)
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
  }

  componentDidMount() {
    timerId = setInterval(()=> {
      const time = this.state.countDown
      this.setState({
        countDown: time - 1000
      })

      if (time < 0) {
        this.props.onEnd()
        window.clearInterval(timerId)
      }
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(timerId)
  }

  render() {
    return (
      <div className="count-down">
        {this.countDown}
      </div>
    )
  }
}

export default countDown
