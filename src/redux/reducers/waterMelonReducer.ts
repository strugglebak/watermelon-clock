import {
  ADD_WATERMELON,
  INIT_WATERMELON
} from '../actionTypes'

export default (state: any[] = [], action: any) => {
  switch(action.type) {
    case ADD_WATERMELON:
      return [action.payload, ...state]
    case INIT_WATERMELON:
      return [...action.payload]
    default:
      return state
  }
}
