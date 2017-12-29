import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../shared/Root';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import  { BrowserRouter as Router, BrowserRouter, Route, Switch } from 'react-router-dom';

import Routes from '../shared/Routes';
import rootReducer from '../shared/redux/rootReducer';


const store = createStore(rootReducer, window.__INIT_REDUX_STATE___);

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <Switch>
                {Routes.map(route => {

                    const Component = route.component;

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={Component}
                        />
                    );
                })}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);