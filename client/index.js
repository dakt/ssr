import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../shared/Root';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import  { 
    BrowserRouter as Router,
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import "babel-polyfill";

import Routes from '../shared/Routes';
import rootReducer from '../shared/redux/rootReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    window.__INIT_REDUX_STATE___ || {},
    composeEnhancers(
        applyMiddleware(ReduxThunk)
    )
);

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <Switch>
                {Routes.map(route => {
                    const { path, exact, component } = route;
                    const Component = component;

                    return (
                        <Route
                            key={path}
                            path={path}
                            exact={exact}
                            component={Component}
                        />
                    );
                })}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);