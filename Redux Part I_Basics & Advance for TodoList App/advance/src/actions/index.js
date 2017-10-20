import * as api from '../api'
import { getIsFetching } from '../reducers'
import { normalize } from 'normalizr';
import * as schema from './schema';


const addTodo = (text) => (dispatch) => {
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    })
  })
}

const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch(({
    type: 'FETCH_TODOS_START',
    filter
  }))
  return api.fetchTodos(filter).then(response => {
    dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response: normalize(response, schema.arrayOfTodos)
    })
  }, error => dispatch({
    type: 'FETCH_TODOS_ERROR',
    filter,
    errorMessage: error.message || 'Something went wrong.'
  })
  )
}

const toggleTodo = (id) => (dispatch) => (
  api.toggleTodo(id).then(response => dispatch({
    type: 'TOGGLE_TODO_SUCCESS',
    response: normalize(response, schema.todo)
  }))
)

export { toggleTodo, fetchTodos, addTodo }