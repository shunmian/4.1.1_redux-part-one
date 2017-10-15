import React from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'

let AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={() => {
        dispatch(actions.addTodo(input.value));
        input.value = ""
      }}>Add Todo</button>
    </div>
  )
}

AddTodo = connect(
  state => {
    return {};
  },
  dispatch => {
    return { dispatch };
  })(AddTodo)

  export default AddTodo