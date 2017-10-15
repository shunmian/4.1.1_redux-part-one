const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

const getVisibleTodos = (state, filter) => {
  let results;
  switch (filter) {
    case "all":
      results = state;
      break;
    case "active":
      results = state.filter(t => t.completed === false)
      break;
    case "completed":
      results = state.filter(t => t.completed === true)
      break;
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
  return results
}

export default todos
export {getVisibleTodos}