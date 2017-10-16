const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextTodos = { ...state }
      action.response.forEach(todo => {
        nextTodos[todo.id] = todo
      })
      return nextTodos
    default:
      return state;
  }
}

const getTodo = (state,id)=>state[id]

export default byId
export {getTodo}