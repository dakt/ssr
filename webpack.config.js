const clientConfig = {
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
    }
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
    }
}

module.exports = [
    clientConfig,
    serverConfig
];