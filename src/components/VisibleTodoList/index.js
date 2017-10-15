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
    this.fetchData()
  }

  componentDidUpdate(prevProps){
    if(this.props.filter !== prevProps.filter){
      this.fetchData()
    }
  }

  fetchData(){
    const {filter,receiveTodos} = this.props
    fetchTodos(filter).then(todos=>receiveTodos(filter, todos))
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

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick:  (id) => {dispatch(actions.toggleTodo(id))},
    receiveTodos: (filter, response) => {dispatch(actions.receiveTodos(filter,response))},
  }
}


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList))

export default VisibleTodoList