import React from 'react';
import { connect } from 'react-redux'
import Todo from './Todo'
import * as actions from './actions' 
import {withRouter} from 'react-router'

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

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      ownProps.params.filter || 'all')
  }
}

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: actions.toggleTodo}
)(TodoList))

export default VisibleTodoList