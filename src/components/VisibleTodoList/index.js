import React, { Component } from 'react';
import { connect } from 'react-redux'
import Todo from './Todo'
import * as actions from './actions'
import { withRouter } from 'react-router'
import { getVisibleTodos } from '../../reducers'

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
    const {filter,fetchTodos} = this.props
    fetchTodos(filter)
  }

  render() {
    return <TodoList {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.params.filter || 'all';
  return {
    filter,
    todos: getVisibleTodos(
      state.todos,
      filter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick:  (id) => {dispatch(actions.toggleTodo(id))},
    fetchTodos: (filter) => {dispatch(actions.fetchTodos(filter))},
  }
}


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList))

export default VisibleTodoList