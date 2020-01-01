import { combineReducers } from 'redux'
import todosReducer from './todosReducer'
import waterMelonReducer from './waterMelonReducer'

export default combineReducers({
  todosReducer,
  waterMelonReducer
})
