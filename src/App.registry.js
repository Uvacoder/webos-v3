import { createSlice } from '@reduxjs/toolkit'

export const Actions = {
  appBodyMouseDown: 'app-body-mousedown',
}

const initialState = {}

const slice = createSlice({
  name: 'App',
  initialState: initialState,
  reducers: {},
  extraReducers: {},
})

export const appBodyMouseDown = () => {
  return {
    type: Actions.appBodyMouseDown,
    payload: null,
  }
}

export default slice.reducer
