import {
  ADD_WATERMELON,
  INIT_WATERMELON
} from '../actionTypes'

export const addWaterMelon = (payload: any) => {
  return {
    type: ADD_WATERMELON,
    payload
  }
}

export const initWaterMelon = (payload: any[]) => {
  return {
    type: INIT_WATERMELON,
    payload
  }
}
