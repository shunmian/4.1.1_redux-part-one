import * as api from '../../api'
import { getIsFetching } from '../../reducers'

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetching(getState(),filter)){
    return Promise.resolve();
  }
  dispatch(requestTodos(filter))
  return api.fetchTodos(filter).then(response=>
    dispatch(receiveTodos(filter,response))
  )
}

const receiveTodos = (filter, response) => {
  return {
    type: 'RECEIVE_TODOS',
    filter,
    response
  }
}

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export { toggleTodo, fetchTodos}