import {
  ADD_WATERMELON,
  INIT_WATERMELON,
  UPDATE_WATERMELON
} from '../actionTypes'

export default (state: any[] = [], action: any) => {
  switch(action.type) {
    case ADD_WATERMELON:
      return [action.payload, ...state]
    case INIT_WATERMELON:
      return [...action.payload]
    case UPDATE_WATERMELON:
      return state.map(wm => {
        return wm.id === action.payload.id
          ? action.payload
          : wm
      })
    default:
      return state
  }
}