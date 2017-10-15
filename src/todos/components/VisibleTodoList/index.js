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
  let results;
  switch (filter) {
    case "all":
      results = todos;
      break;
    case "active":
      results = todos.filter(t => t.completed === false)
      break;
    case "completed":
      results = todos.filter(t => t.completed === true)
      break;
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
  return results
}

const mapStateToProps = (state,ownProps) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      ownProps.filter)
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