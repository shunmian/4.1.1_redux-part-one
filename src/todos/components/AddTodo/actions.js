import {v4} from 'node-uuid'

const addTodo = (text) => ({
  type: "ADD_TODO",
  text: text,
  id: v4()
})

export { addTodo }