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
) {
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