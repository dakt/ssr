import path from 'path';
import Koa from 'koa';
import KoaStatic from 'koa-static';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import {  Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import 'isomorphic-fetch';

import Root from '../shared/Root';
import rootReducer from '../shared/redux/rootReducer';


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
    .use(async function(ctx, next) {
        let preloadedState = { name: 'SERVER_SYNC_NAME' };
        const store = createStore(rootReducer, preloadedState, applyMiddleware(ReduxThunk));

        await store.dispatch(async function(dispatch, getState) {
            const data = await Promise.resolve('ASYNC_NAME');
            store.dispatch({ type: 'CHANGE_NAME', payload: data });
        });

        preloadedState = store.getState();

        ctx.body = render(
            <Provider store={store}>
                <Root />
            </Provider>,
            preloadedState
        );
    });


function startServer({ port = 3000 }) {
    console.info('Server is launched on http://%s:%s', 'localhost', port);
    server.listen(port);
}

startServer({});
