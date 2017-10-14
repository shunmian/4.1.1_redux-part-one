import {v4} from 'node-uuid'

const setVisibilityFilter = (filter) => {
  return {
    type: "SET_VISIBILITY_FILTER",
    filter: filter
  }
}

const addTodo = (text) => ({
  type: "ADD_TODO",
  text: text,
  id: v4()
})


const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export {setVisibilityFilter, addTodo, toggleTodo}