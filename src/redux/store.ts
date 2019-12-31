import rootReducer from './reducers/indexReducer'
import { createStore } from 'redux'

const store = createStore(rootReducer)

export default store
