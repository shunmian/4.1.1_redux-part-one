import React from 'react';
import Footer from './components/Footer'
import VisibleTodoList from './components/VisibleTodoList'
import AddTodo from './components/AddTodo'

const TodoApp = () => {
  return (
    <div className="App">
      <AddTodo />
      <VisibleTodoList/>
      <Footer />
    </div>
  )
}

export default TodoApp;
