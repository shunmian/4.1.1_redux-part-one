import { combineReducers } from 'redux'

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };

  const isFetching = (state=false,action)=>{
    if (action.filter !== filter) {
      return state;
    }
    switch(action.type) {
      case 'RECEIVE_TODOS':
        return false;
      case 'REQUEST_TODOS':
        return true;
      default:
        return state
    }
  }

  return combineReducers({
    ids,
    isFetching
  })
}


const getIds = (state) => state.ids;
const getIsFetching = (state) =>state.isFetching

export default createList
export { getIds, getIsFetching }