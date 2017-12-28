const webpack = require('webpack');
const StartServerPlugin = require('start-server-webpack-plugin');

const clientConfig = {
    target: 'web',
    entry: __dirname + '/client/index.js',
    output: {
        filename: 'build/client.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: __dirname + '/node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            }
        ]
    },
    plugins: [
        // Ignore watch on files that are produced by the
        // compilation and might cause compilation loops
        new webpack.WatchIgnorePlugin([

        ]),
    ]
};

const serverConfig = {
    target: 'node',
    entry: __dirname + '/server/index.js',
    output: {
        filename: 'build/server.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: __dirname + '/node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            }
        ]
    },
    plugins: [
        new StartServerPlugin({
            name: 'build/server.js',
        }),
        new webpack.WatchIgnorePlugin([

        ]),
    ]
}

module.exports = (platform) => {
    return platform === 'web' ? clientConfig : serverConfig;
}