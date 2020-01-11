import { format } from 'date-fns'

/**
 * 
 * @param element 监听元素
 * @param eventType 监听事件
 * @param selector element 中的子元素
 * @param fn 需要执行的操作
 */

export function delegate(
  element: any, 
  eventType: any, 
  selector: any, 
  fn: any
): any {
    element.addEventListener(eventType, (e: any) => {
      let el = e.target
      while (!el.matches(selector)) {
        if (element === el) {
          el = null
          break
        }
        el = el.parentNode
      }
      el && fn.call(el, e, el)
    })
    return element
   }

export function dayOfWeekTransfer(date: string): any {
  const dayMap = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const index = parseInt(format(new Date(date), 'i'), 10) - 1
  return dayMap[index]
}

export function yearMonthDayTransfer(date: string): any {
  const arr = date.split('-')
  return `${arr[0]}年${arr[1]}月${arr[2]}日`
}


export function timeTransfer (time: string, formatText: string, itemType: string): any {
    const formatedTime = format(new Date(time), formatText)
    const arr = formatedTime.split('-')
    const str = itemType === 'finished'
      ? formatedTime
      : `${arr[0]}月${arr[1]}日`
    return str
  }