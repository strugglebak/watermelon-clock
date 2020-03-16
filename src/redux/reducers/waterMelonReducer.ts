import {
  ADD_WATERMELON,
  INIT_WATERMELON,
  UPDATE_WATERMELON,
  FETCH_WATERMELON_SUCCESS,
  SYNC_UPDATE_TODO_SUCCESS
} from '../actionTypes'

export default (state: any[] = [], action: any) => {
  switch(action.type) {
    case ADD_WATERMELON:
      return [action.payload, ...state]
    case FETCH_WATERMELON_SUCCESS:
    case INIT_WATERMELON:
      return [...(action.payload).map((wm: any) => {
        if (!wm.extra) {
          wm.extra = {}
          Object.assign(wm.extra, { deleted: false })
        }
        return wm
      })]
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
