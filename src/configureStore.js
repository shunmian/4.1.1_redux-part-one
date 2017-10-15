import { createStore } from 'redux'
import todoApp from './reducers'

const loggerSupport = (store) => (next) => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type)
    console.log('%c prev state', 'color: gray', store.getState())
    console.log('%c action', 'color:blue', action)
    const returnValue = next(action)
    console.log('%c next state', 'color:green', store.getState());
    console.groupEnd(action.type)
    return returnValue
  }
}

const promiseSupport = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next)
  } else {
    return next(action)
  }
}


const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch)
  })
}

const configureStore = () => {
  const store = createStore(todoApp)
  const middlewares = [promiseSupport]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerSupport);
  }
  wrapDispatchWithMiddlewares(store, middlewares)
  return store
}

export default configureStore