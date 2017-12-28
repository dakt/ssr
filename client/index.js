import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../shared/Root';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../shared/redux/rootReducer';

const store = createStore(rootReducer, window.__INIT_REDUX_STATE___);

ReactDOM.hydrate(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);