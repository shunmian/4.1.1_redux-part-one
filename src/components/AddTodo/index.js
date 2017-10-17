import React from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'

let AddTodo = (props) => {
  let input
  const {addTodo} = props;
  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={() => {addTodo(input.value);
        input.value = ""
      }}>Add Todo</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (text) => dispatch(actions.addTodo(text))
})

AddTodo = connect(
  state => {
    return {};
  },
  mapDispatchToProps)(AddTodo)

  export default AddTodo