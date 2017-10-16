import * as api from '../../api'

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

const fetchTodos = (filter) => {
  return api.fetchTodos(filter).then(response=>
    receiveTodos(filter,response)
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

export { toggleTodo, fetchTodos, requestTodos}