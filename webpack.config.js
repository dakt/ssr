const presets = [
    'react',
    'env',
];

const plugins = [
    'transform-object-rest-spread',
];

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
                    options: { presets, plugins }
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
                    options: { presets, plugins }
                }
            }
        ]
    }
}

module.exports = [
    clientConfig,
    serverConfig
];