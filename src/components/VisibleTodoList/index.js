import React from 'react';
import { connect } from 'react-redux'
import Todo from './Todo'
import * as actions from './actions' 
import {withRouter} from 'react-router'
import {getVisibleTodos} from '../../reducers'

const TodoList = ({
  onTodoClick, todos
}) =>
  <ul>
    {todos.map(todo => <Todo key={todo.id}
      onClick={() => onTodoClick(todo.id)}
      {...todo} />)}
  </ul>

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