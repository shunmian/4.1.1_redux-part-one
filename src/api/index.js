import {v4} from 'node-uuid'

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
  }, {
    id: v4(),
    text: 'let’s go',
    completed: false,
  }],
};

const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve,ms)
)

export const fetchTodos = (filter) => {
  return delay(500).then(()=>{
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(todo=>!todo.completed)
      case 'completed':
        return fakeDatabase.todos.filter(todo=>todo.completed)
      default:
        throw new Error(`Unknown filter:${filter}`)
    }
  })
}