import React, { Component } from 'react';
import { connect } from 'react-redux'
import Todo from './Todo'
import * as actions from './actions'
import { withRouter } from 'react-router'
import { getVisibleTodos, getIsFetching } from '../../reducers'

const TodoList = ({
  onTodoClick, todos
}) =>
  <ul>
    {todos.map(todo => <Todo key={todo.id}
      onClick={() => onTodoClick(todo.id)}
      {...todo} />)}
  </ul>

class VisibleTodoList extends Component {

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps){
    if(this.props.filter !== prevProps.filter){
      this.fetchData()
    }
  }

  fetchData(){
    const {filter,fetchTodos, requestTodos} = this.props
    requestTodos(filter)
    fetchTodos(filter)
  }

  render() {
    const {todos, onTodoClick, isFetching} = this.props
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    return <TodoList todos={todos} onTodoClick={onTodoClick} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.params.filter || 'all';
  return {
    filter,
    todos: getVisibleTodos(
      state,
      filter),
    isFetching: getIsFetching(state,filter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick:  (id) => {dispatch(actions.toggleTodo(id))},
    fetchTodos: (filter) => {dispatch(actions.fetchTodos(filter))},
    requestTodos: (filter) => {dispatch(actions.requestTodos(filter))}
  }
}


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList))

export default VisibleTodoList