import { combineReducers } from 'redux'
import todos, * as fromTodos from './todos'

const todoApp = combineReducers({
  todos
});

const getVisibleTodos = (state, filter) => {
  return fromTodos.getVisibleTodos(state,filter)
}

export default todoApp

export {getVisibleTodos}

