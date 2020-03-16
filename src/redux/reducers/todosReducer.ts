import {
  ADD_TODO,
  INIT_TODOS,
  UPDATE_TODO,
  EDITING_TODO,
  FETCH_TODOS_SUCCESS
} from '../actionTypes'
import _ from 'lodash'
import { format } from 'date-fns'

export default (state: any[] = [], action: any): any => {
  switch(action.type) {
    case ADD_TODO:
      return [...state, action.payload]
    case FETCH_TODOS_SUCCESS:
      // mount 时需要对每个 todo 的编辑状态置为 false
      const newTodos = action.payload.map((todo: any) => {
        return Object.assign({}, todo, { editing: false })
      })
      return [...newTodos]
    case INIT_TODOS:
      return [...action.payload]
    case UPDATE_TODO:
      // 新 state
      let newState = state.map(todo=> {
        return todo.id === action.payload.id
          ? action.payload
          : todo
      })
      // 根据时间排序 stateOfOrderByTime = { 时间1: {...}, 时间2: {...}, ...}
      let stateOfOrderByTime = _.groupBy(newState, (todo: any) => format(new Date(todo.updated_at), 'yyyy-MM-dd HH:mm:ss'))
      // keyOfTime = [时间1, 时间2, ...]
      let keyOfTime = Object.keys(stateOfOrderByTime).sort((a, b) => Date.parse(b) - Date.parse(a))
      let orderedState: any[] = []
      keyOfTime.map(key => stateOfOrderByTime[key].forEach(item => orderedState.push(item)))

      return [...orderedState]
    case EDITING_TODO:
      return state.map(todo => {
        return todo.id === action.payload
          ? Object.assign({}, todo, { editing: true })
          : Object.assign({}, todo, { editing: false })
      })
    default:
      return state
  }
}
