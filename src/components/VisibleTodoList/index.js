import React, { Component } from 'react';
import { connect } from 'react-redux'
import Todo from './Todo'
import * as actions from './actions'
import { withRouter } from 'react-router'
import { getVisibleTodos } from '../../reducers'
import { fetchTodos } from '../../api'

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
    fetchTodos(this.props.filter).then((todos) => {
      console.log(`filter: ${this.props.filter}, todos from fakeDatabase:`,todos)
    })
  }

  componentDidUpdate(prevProps){
    if(this.props.filter !== prevProps.filter){
      fetchTodos(this.props.filter).then((todos) => {
        console.log(`filter: ${this.props.filter}, todos from fakeDatabase:`,todos)
      })
    }
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
      ownProps.params.filter || 'all')
  }
}



VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: actions.toggleTodo }
)(VisibleTodoList))

export default VisibleTodoList