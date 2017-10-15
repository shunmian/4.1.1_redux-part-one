import { combineReducers } from 'redux'

const byId = (state={},action) => {
  switch (action.type){
    case 'RECEIVE_TODOS':
      const nextTodos = {...state}
      action.response.forEach(todo => {
        nextTodos[todo.id] = todo
      })
      return nextTodos
    default:
      return state;
  }
}


const allIds = (state=[],action) =>{
  if(action.filter !== 'all'){
    return state
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo=>todo.id)
    default:
      return state;
  }
}

const activeIds = (state=[],action) =>{
  if(action.filter !== 'active'){
    return state
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo=>todo.id)
    default:
      return state;
  }
}

const completedIds = (state=[],action) =>{
  if(action.filter !== 'completed'){
    return state
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo=>todo.id)
    default:
      return state;
  }
}

const IdsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
})

const todos = combineReducers({
  byId,
  IdsByFilter
})

const getVisibleTodos = (state, filter) => {
  return state.IdsByFilter[filter].map(id=>state.byId[id])
}

export default todos
export { getVisibleTodos }