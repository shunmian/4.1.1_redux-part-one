import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

const configureStore = () => {
  const middlewares = [promise]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger);
  }
  return createStore(
    todos,
    applyMiddleware(...middlewares)
  )
}

export default configureStore