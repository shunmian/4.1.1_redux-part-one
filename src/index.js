import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore'
import Root from './Root'

ReactDOM.render(
    <Root store={configureStore()}/>,
    document.getElementById('root')
);

registerServiceWorker();
