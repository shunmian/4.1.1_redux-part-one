import todo from './todo'
import { combineReducers } from 'redux'

const byId = (state={},action) => {
  switch (action.type){
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id],action)
      }  
    default:
      return state;
  }
}

const allIds = (state=[],action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        action.id
      ]
    default:
      return state;
  }
}

const todos = combineReducers({
  byId,
  allIds
})

const getAllTodos = (state) => state.allIds.map(id => state.byId[id])

const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos (state)
  let results;
  switch (filter) {
    case "all":
      results = allTodos;
      break;
    case "active":
      results = allTodos.filter(t => t.completed === false)
      break;
    case "completed":
      results = allTodos.filter(t => t.completed === true)
      break;
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
  return results
}

export default todos
export {getVisibleTodos}