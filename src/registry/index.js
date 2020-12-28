import persistState from 'redux-localstorage'
import createSagaMiddleware from 'redux-saga'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import sagas from './sagas'

import App from '../App.registry'
import ContextMenu from '../system/ContextMenu/ContextMenu.registry'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    App,
    ContextMenu,
  },
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
  devTools: true,
  enhancers: [persistState([])],
})

sagaMiddleware.run(sagas)
