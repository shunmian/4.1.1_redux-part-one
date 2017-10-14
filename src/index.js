import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './todos/configureStore'
import Root from './todos/Root'

ReactDOM.render(
    <Root store={configureStore()}/>,
    document.getElementById('root')
);

registerServiceWorker();
