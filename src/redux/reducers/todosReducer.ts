import {
  ADD_TODO,
  INIT_TODOS,
  UPDATE_TODO,
  EDITING_TODO,
  FETCH_TODOS_SUCCESS
} from '../actionTypes'

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
      return state.map(todo=> {
        return todo.id === action.payload.id
          ? action.payload
          : todo
      })
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
