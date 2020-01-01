import {
  ADD_TODO,
  INIT_TODOS,
  UPDATE_TODO,
  EDITING_TODO
} from '../actionTypes'

export default (state: any[] = [], action: any): any => {
  switch(action.type) {
    case ADD_TODO:
      return [...state, action.payload]
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
