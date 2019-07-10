import { StoryDecorator } from '@storybook/react'
import { createHashHistory } from 'history'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middle = [thunk, logger]
const history = createHashHistory()

let compose1: any
// @ts-ignore
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  // @ts-ignore
  compose1 = compose(
    applyMiddleware(...middle),
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
} else {
  compose1 = compose(applyMiddleware(...middle))
}

const storeObj: object = {}
const store = createStore(combineReducers(storeObj), compose1)

export function addReducer(name: string, reducer: any) {
  storeObj[name] = reducer
  store.replaceReducer(combineReducers(storeObj))
}

const ProviderRoot: StoryDecorator = (storyFn) => {
  return (
    <Router history={history}>
      <Provider store={store}>{storyFn()}</Provider>
    </Router>
  )
}

export { ProviderRoot, history }
export default store
