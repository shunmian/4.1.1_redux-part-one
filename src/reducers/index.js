import { combineReducers } from 'redux'
import createList, * as fromList from './createList'
import byId, * as fromById from './byId'

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
})

const todos = combineReducers({
  byId,
  listByFilter
})

const getVisibleTodos = (state, filter) => {
  debugger
  const ids = fromList.getIds(state.listByFilter[filter])
  return ids.map(id=>fromById.getTodo(state.byId,id))
}

export default todos
export { getVisibleTodos }