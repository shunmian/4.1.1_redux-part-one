import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore'
import Root from './Root'
import {fetchTodos} from './api'

fetchTodos('all').then((todos)=>{
    console.log("fakeDatabase:", todos)
})

ReactDOM.render(
    <Root store={configureStore()}/>,
    document.getElementById('root')
);

registerServiceWorker();
