import React, { useState,useEffect, FunctionComponent } from 'react'

import './countDown.styl'

interface ICountDownProps {
  time: number // 传入的倒计时，单位是 ms
  onEnd: () => void
  duration: number
}

let timerId:NodeJS.Timeout

// const delayTime = 0 // 延时

const CountDown:FunctionComponent<ICountDownProps> = (props: ICountDownProps) => {

  const [countDown, setCountDown] = useState(props.time)

  // 时间换算显示
  const min = Math.floor(countDown/1000/60)
  const sec = Math.floor(countDown/1000%60)
  const time = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`

  // progress bar 进度条长度计算显示
  const { duration } = props
  const progressWidth = (100 - (countDown - 1000) * 100 / duration).toFixed(3)

  useEffect(()=> {
    document.title = `${time} - 西瓜闹钟 App`
    timerId = setInterval(()=> {
      setCountDown(countDown - 1000)
      if (countDown < 1000) {
        console.log(countDown)
        props.onEnd()
        window.clearInterval(timerId)
        document.title = '西瓜闹钟 App'
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
