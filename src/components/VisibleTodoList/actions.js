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

export { toggleTodo, receiveTodos }