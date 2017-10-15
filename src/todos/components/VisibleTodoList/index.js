import React from 'react';
import { connect } from 'react-redux'
import Todo from './Todo'
import * as actions from './actions' 

const TodoList = ({
  onTodoClick, todos
}) =>
  <ul>
    {todos.map(todo => <Todo key={todo.id}
      onClick={() => onTodoClick(todo.id)}
      {...todo} />)}
  </ul>

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos
    case "SHOW_ACTIVE":
      return todos.filter(t => t.completed === false)
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed === true)
    default:
      return todos
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(actions.toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList