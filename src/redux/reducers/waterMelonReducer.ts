import {
  ADD_WATERMELON
} from '../actionTypes'

export default (state: any[] = [], action: any) => {
  switch(action.type) {
    case ADD_WATERMELON:
      return [action.payload, ...state]
    default:
      return state
  }
}
