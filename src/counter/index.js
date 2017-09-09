import expect from 'expect'
// import {createStore} from 'redux'
import deepFreeze from 'deep-freeze'

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
function test() {
    console.log("test begins")
    expect(
        counter(0, { type: "INCREMENT" })).toEqual(1)

    expect(
        counter(3, { type: "DECREMENT" })).toEqual(2)

    expect(
        counter(2, { type: "OTHER ACTION" })).toEqual(2)

    expect(
        counter(0, { type: undefined })).toEqual(0)

    console.log("all the test are passed")
}

test()

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    dispatch({});//dummy dispatch
    return { getState, dispatch, subscribe }
}

const store = createStore(counter);


store.subscribe(() => {
    console.log(store.getState())
    document.getElementsByClassName('App-intro')[0].textContent = store.getState();
});

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' })
})

const addCounter = (list) => {
    // list.push(0);
    // return list;
    return [...list, 0];
}

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    deepFreeze(listBefore);
    expect(
        addCounter(listBefore)
    ).toEqual(listAfter);
};
testAddCounter();

const removeCounter = (list, index) => {
    // list.splice(index,1);
    // return list;
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ]
}

const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter)
}
testRemoveCounter()

const incrementCounter = (list, index) => {
    // list[index]++;
    // return list;
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
    ]
}

const testIncrementCounter = () => {
    const listBefore = [0, 10, 20]
    const listAfter = [0, 11, 20]
    deepFreeze(listBefore);
    expect(
        incrementCounter(listBefore, 1)
    ).toEqual(listAfter);
};

testIncrementCounter()

export {store}



