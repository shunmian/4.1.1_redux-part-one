const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      const nextTodos = { ...state }
      action.response.forEach(todo => {
        nextTodos[todo.id] = todo
      })
      return nextTodos
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        [action.response.id]:action.response
      }
    default:
      return state;
  }
}

const getTodo = (state,id)=>state[id]

export default byId
export {getTodo}