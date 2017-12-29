import path from 'path';
import chalk from 'chalk';
import Koa from 'koa';
import KoaStatic from 'koa-static';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import {  Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { matchPath } from 'react-router'
import 'isomorphic-fetch';
// Looks like babel's object-rest-spread plugin is using generator
// runtime polyfill and is not relying that generators 
// functions are implemented in node enviroment
import "babel-polyfill";

import Root from '../shared/Root';
import rootReducer from '../shared/redux/rootReducer';
import Routes from '../shared/Routes';


const server = new Koa();

function render(Component, preloadedState) {
    const html = ReactDOMServer.renderToString(Component);
    return (
`<!doctype html>
<html>
    <head>
        <title>Test SSR</title>
        <meta charset="utf-8" />
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="text/javascript" src="client.js" defer></script>
        <script type="text/javascript">
            window.__INIT_REDUX_STATE___ = ${JSON.stringify(preloadedState)}
        </script>
    </head>
    <body>
        <div id="root">${html}</div>
    </body>
</html>`);
}

server
    .use(KoaStatic(path.resolve('build')))
    .use(async (ctx, next) => {
        const { path, method } = ctx;

        // Log request URL
        console.log(chalk.green(method), path);

        // Configure store
        const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

        // Match route so that we can extract component to render
        const RouteMeta = Routes.reduce((acc, nextRoute) => {
            const matchedRoute = matchPath(path, nextRoute);
            return matchedRoute ? Object.assign({}, matchedRoute, nextRoute) : acc;
        }, null);

        if (RouteMeta === null) {
            // TODO: 404
        }

        // Try and call component exposed static method and push context to it like store, etc.
        const Component = RouteMeta.component;
        Component.getInitialProps && await Component.getInitialProps({ store });

        const preloadedState = store.getState();

        ctx.body = render(
            <Provider store={store}>
                <Component />
            </Provider>,
            preloadedState
        );
    });

function startServer({ port = 3000 }) {
    console.info('Server is launched on http://%s:%s', 'localhost', port);
    server.listen(port);
}

startServer({});
