import React, { useState,useEffect, FunctionComponent } from 'react'

import './countDown.styl'

interface ICountDownProps {
  time: number // 传入的倒计时，单位是 ms
  onEnd: () => void
  duration: number
}

interface ICountDownState {
  countDown: number // 倒计时，单位是 ms
}

let timerId:NodeJS.Timeout

// const delayTime = 0 // 延时

const CountDown:FunctionComponent<ICountDownProps> = (props: ICountDownProps) => {

  const [countDown, setCountDown] = useState(props.time)

  // 时间换算显示
  const min = Math.floor(countDown/1000/60)
  const sec = Math.floor(countDown/1000%60)
  const time = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
  console.log(time)

  // progress bar 进度条长度计算显示
  const { duration } = props
  const progressWidth = (Math.floor(100 - countDown * 100 / duration))

  useEffect(()=> {
    document.title = `${time} - 西瓜闹钟 App`
    timerId = setInterval(()=> {
      setCountDown(countDown - 1000)
      if (countDown < 0) {
        document.title = '西瓜闹钟 App'
        props.onEnd()
        window.clearInterval(timerId)
      }
    }, 1000)

    return () => {
      // 组件销毁时
      window.clearInterval(timerId)
      document.title = '西瓜闹钟 App'
    }
  })

  return (
    <div className="count-down">
      <div className="progress"
        style={{
          width: `${progressWidth}%`
        }}
      ></div>
      <p className="time">{time}</p>
    </div>
  )
}

export default CountDown
