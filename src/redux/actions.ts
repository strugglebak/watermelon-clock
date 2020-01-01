import {
  ADD_TODO,
  INIT_TODOS,
  UPDATE_TODO,
  EDITING_TODO,
  ADD_WATERMELON
} from './actionTypes'

export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  }
}

export const initTodos = (payload: any[]) => {
  return {
    type: INIT_TODOS,
    payload
  }
}

export const updateTodo = (payload: any) => {
  return {
    type: UPDATE_TODO,
    payload
  }
}

export const editingTodo = (payload: number) => {
  return {
    type: EDITING_TODO,
    payload
  }
}

export const addWaterMelon = (payload: any) => {
  return {
    type: ADD_WATERMELON,
    payload
  }
}
