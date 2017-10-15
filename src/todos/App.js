import React from 'react';
import { connect } from 'react-redux'
import Footer from './components/Footer'
import VisibleTodoList from './components/VisibleTodoList'
import AddTodo from './components/AddTodo'

const TodoApp = ({params}) => {
  return (
    <div className="App">
      <AddTodo />
      <VisibleTodoList/>
      <Footer />
    </div>
  )
}

export default TodoApp;
