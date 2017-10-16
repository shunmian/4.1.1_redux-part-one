import * as api from '../../api'
import { getIsFetching } from '../../reducers'



const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetching(getState(),filter)){
    return Promise.resolve();
  }
  dispatch(({
    type: 'FETCH_TODOS_START',
    filter
  }))
  return api.fetchTodos(filter).then(response=>
    dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response
    }),error=>dispatch({
      type: 'FETCH_TODOS_ERROR',
      filter,
      errorMessage: error.message
    })
  )
}

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export { toggleTodo, fetchTodos}