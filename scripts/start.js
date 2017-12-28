const webpack = require('webpack');
const wds = require('webpack-dev-server');
const webpackConfigFactory = require('../webpack.config');
const chalk = require('chalk');

const log = console.log;


const serverConfig = webpackConfigFactory('server');
const clientConfig = webpackConfigFactory('client');

log('Compiling server');
const serverCompiler = webpack(serverConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        log('ERROR', err);
        return;
    }

    log('Server config [ OK ]');
});

log('Compiling client');
const clientCompiler = webpack(clientConfig, (err, status) => {
    if (err || status.hasErrors()) {
        log('ERROR', err);
        return;
    }

    log('Client config [ OK ]');
});

serverCompiler.watch({

}, (err, status) => {
    if (err || status.hasErrors()) {
        log('ERROR', err);
        return;
    }

    log('Server code compiled, watching for changes...', status.hash);
});

const clientDevServer = new wds(clientCompiler, {
    stats: { colors: true }
});

clientDevServer.listen(8080, 'localhost', f => f);