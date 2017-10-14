
export const saveState = (state) => {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState)
  }catch(err){
    // not do anything
  }
}

export const loadState = () => {
  try{
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    return state;
  }catch(err){
    return undefined;
  }
}