
import React, { PropTypes } from 'react';
import App from './App';
import { Provider } from 'react-redux';

const Root = ({store}) =>(
    <Provider store={store}>
        <App />
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}
export default Root