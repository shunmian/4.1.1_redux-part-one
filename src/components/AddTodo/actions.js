import * as api from '../../api'

const addTodo = (text) => (dispatch) => {
  api.addTodo(text).then(response=>dispatch({
    type: 'ADD_TODO_SUCCESS',
    response
  }))
}

export { addTodo }