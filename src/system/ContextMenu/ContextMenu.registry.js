import { createSlice } from '@reduxjs/toolkit'

import { Actions as AppActions } from '../../App.registry'

export const Actions = {
  contextMenuStatus: 'context-menu-status',
}

const initialState = {
  visibility: false,
}

const slice = createSlice({
  name: 'ContextMenu',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [AppActions.appBodyMouseDown]: (state, action) => {
      state.visibility = false
    },
    [Actions.contextMenuStatus]: (state, action) => {
      state.visibility = action.payload
    },
  },
})

export const contextMenuStatus = (payload) => {
  return {
    type: Actions.contextMenuStatus,
    payload,
  }
}

export default slice.reducer
