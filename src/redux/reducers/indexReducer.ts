import { combineReducers } from 'redux'
import todosReducer from './todosReducer'
import waterMelonReducer from './waterMelonReducer'
import userReducer from './userReducer'

export default combineReducers({
  todosReducer,
  waterMelonReducer,
  userReducer
})
