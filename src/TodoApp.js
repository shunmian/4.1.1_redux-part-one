import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux'

//action creator
const setVisibilityFilter=(filter)=>{
  return {
    type: "SET_VISIBILITY_FILTER",
    filter: filter
  }
}

const addTodo=(text)=>{
  return {
    type: "ADD_TODO",
    text: text,
    id: nextTodoId++
  }
}

const toggleTodo = (id)=>{
  return {
      type: 'TOGGLE_TODO',
      id
    }
}


let nextTodoId = 0;

let AddTodo = ({dispatch}) => {
  let input
  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = ""
      }}>Add Todo</button>
    </div>
  )
}

AddTodo = connect(
  state=>{
    return {};
  },
  dispatch=>{
    return {dispatch};
  })(AddTodo)


const Todo = ({
  onClick,
  completed,
  text
}) => (
    <li
      onClick={onClick}
      style={{
        textDecoration:
        completed ?
          'line-through' :
          'none'
      }}>
      {text}
    </li>
  );

const TodoList = ({
  onTodoClick, todos
}) =>
  <ul>
    {todos.map(todo => <Todo key={todo.id}
      onClick={() => onTodoClick(todo.id)}
      {...todo} />)}
  </ul>

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    > All </FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_ACTIVE'
    > Active </FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_COMPLETED'
    > Completed </FilterLink>
  </p>
)

const Link = ({
  active,
  children,
  onClick,
  }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick()
      }} >
      {children}
    </a>)
}

const mapStateToLinkProps = (state,ownProps)=>{
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToLinkProps = (dispatch,ownProps)=>{
  return{
    onClick: ()=>{dispatch(
      setVisibilityFilter(ownProps.filter))
    }
  }
}



const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)

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

const mapStateToProps = (state)=>{
  return{
    todos:getVisibleTodos(
      state.todos,
      state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onTodoClick:(id)=>{
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

const TodoApp = ({
          todos,
  visibilityFilter
}) => {
  return (
    <div className="App">
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  )
}

export default TodoApp;
